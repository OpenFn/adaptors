each(
  dataPath('periods[*]'),
  alterState(state => {
    return execute(
      alterState(state => {
        console.log(
          `Started ${state.data.year}/${state.data.month} at: ${Date()}`
        );
        return state;
      }),
      fetch(
        'https://comtrade.un.org/api/get/bulk/C/M/' +
          state.data.year +
          state.data.month +
          '/ALL/HS?token=' +
          state.token,
        `/home/taylor/vcs/${state.data.year}${state.data.month}.zip`
      ),
      unzip(
        `/home/taylor/vcs/${state.data.year}${state.data.month}.zip`,
        `/home/taylor/vcs/${state.data.year}${state.data.month}`
      ),
      load(
        `/home/taylor/vcs/${state.data.year}${state.data.month}`,
        'value-chain-solutions', // project
        'test01', // dataset
        'fact_comtrade_2', // table
        {
          schema:
            'classification:STRING,year:STRING,period:STRING,period_desc:STRING,aggregate_level:STRING,is_leaf_code:STRING,trade_flow_code:STRING,trade_flow:STRING,reporter_code:STRING,reporter:STRING,reporter_iso:STRING,partner_code:STRING,partner:STRING,partner_iso:STRING,commodity_code:STRING,commodity:STRING,qty_unit_code:STRING,qty_unit:STRING,qty:INTEGER,netweight_kg:INTEGER,trade_value:INTEGER,flag:STRING',
          // schemaUpdateOptions: ['ALLOW_FIELD_ADDITION'],
          // createDisposition: 'CREATE_IF_NEEDED',
          writeDisposition: 'WRITE_APPEND',
          skipLeadingRows: 1,
        } // loadOptions
      ),
      alterState(state => {
        console.log(
          `Upload done for ${state.data.year}/${state.data.month}, removing unzipped csv`
        );
        const dir = `/home/taylor/vcs/${state.data.year}${state.data.month}`;
        fs.rmdir(dir, { recursive: true }, err => {
          if (err) {
            throw err;
          }
          console.log(`${dir} is deleted!`);
        });
        return state;
      }),
      alterState(state => {
        console.log(
          `Finished ${state.data.year}/${state.data.month} at: ${Date()}`
        );
        return state;
      })
    )(state);
  })
);

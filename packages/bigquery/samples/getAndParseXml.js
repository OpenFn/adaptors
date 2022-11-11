languageHttp.get(
  '/API/V1/SDMX/V21/datasource/TRN/reporter/840/partner/000/product/ALL/year/2018/datatype/reported',
  {
    query: { detail: 'dataonly' },
  },
  state => parseXML(state.data.body)(state)
);

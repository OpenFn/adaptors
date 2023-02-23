# Language SFTP

Language Pack for building expressions and operations to work with SFTP servers.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/sftp-configuration-schema/)
definition.

## List the content of a directory

```js
alterState(state => {
  return list('/path/To/Directory')(state).then(response => {
    console.log(`There are ${response.data.length} files.`);
    return response;
  });
});
```

## sample getCSV expression

```js
getCSV('path/to/file.csv', 'utf8', {
  quote: 'off',
  delimiter: ';',
  noheader: true,
  filter: {
    type: 'startsWith',
    key: 'field1',
    value: 'JO',
  },
});
```

A more complex example that breaks up the CSV file into multiple payloads for
quicker processing.

```js
fn(state => {
  return list('/')(state).then(state => {
    const targetNames = [
      'exportContacts', //example fileName
    ];
    console.log(`Fetching files: ${targetNames}`);
    const files = state.data
      .filter(file => file.name.split('.')[1] === 'csv')
      .filter(file =>
        targetNames.some(targetName =>
          file.name.toLowerCase().includes(targetName)
        )
      );

    if (files.length === 0) console.log('No new CSV files found.');
    return { ...state, data: {}, files };
  });
});

each(
  '$.files[*]',
  fn(state => {
    const { configuration, data } = state;

    return getCSV(`/${data.name}`)(state).then(async state => {
      const headers = state.data
        .shift()
        .split(';')
        .map(h => (h = h.replace(/"/g, '')));

      function toObject(item) {
        const values = item.split(';');

        return Object.fromEntries(
          headers.map((k, i) => {
            return values[i]
              ? [k, values[i].replace(/"/g, '')]
              : [k, values[i]];
          })
        );
      }

      let countInbox = 0;

      //to post CSV data as individual Messages to OpenFn Inbox
      const postToInbox = async data => {
        countInbox++;

        console.log(`Sending request ${countInbox} to inbox`);

        await new Promise(resolve => setTimeout(resolve, 200));

        await http.post({
          url: configuration.openfnInboxUrl,
          data: data,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        })(state);
      };

      //To split up into multiple, smaller payloads before send to OpenFn Inbox
      const chunkSize = 500;

      console.log(
        state.data.length,
        'rows will be sent in',
        Math.ceil(state.data.length / chunkSize),
        'requests of',
        chunkSize,
        'rows each.'
      );

      while (state.data.length > 0) {
        console.log('data.length', state.data.length);
        await postToInbox({
          fileName: data.name,
          fileType: data.name.split('-')[0],
          uploadDate: new Date(data.modifyTime).toISOString(),
          json: state.data.splice(0, chunkSize).map(toObject),
        });
      }

      return { configuration, references: [], data: {} };
    });
  })
);
```

## sample putCSV expression

This function converts JSON to CSV and post to a server

```js
putCSV('/some/path/to_file.csv', 'utf8', { delimiter: ';', noheader: true });
```

### Get JSON from FTP server

```js
getJSON('path/to/file.json', 'utf8');
```

### Custom request to an http endpoint

This adaptor exports `http` from `language-common`. Here, we outline the usage
in order to make custom requests to an endpoint. It returns a promise

```js
alterState(state => {
  return http
    .post({ url: 'yourURL', data: { name: 'Mamadou' } })(state)
    .then(response => {
      // do something with response;
      return response;
    });
});
```

## Development

Clone the repo, run `pnpm install`.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build the docs for this repo, `pnpm build docs`

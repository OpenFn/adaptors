# language-azure-storage <img src='assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the Azure
Storage APIs. At present, this adaptor only supports the Azure Blob Storage,
API, but could be expanded for future Azure Storage services (e.g., Files,
Tables, Queues, etc.).

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/azure-storage-docs)
for full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/azure-storage-configuration-schema/)
for required and optional `configuration` properties.

### An example showing multiple capabilties of this adaptor

Assume you have a simple `state.json` file as follows:

```json
{
  "data": {
	"foo": "bar",
	"bif": "baz",
	"sunday": "monday",
	"answer": "42"
  },
  "configuration": {
      "accountName": "myaccountname",
      "accountKey": "myaccountkey",
      "containerName": "mycontainer"
  }
}
```

Create a file `job.js`, as shown below, to run with the OpenFn CLI. This
example uploads the blob with a year/month partitioning scheme, then
downloads the same blob and fetches the blob properties. It would be extremely
unusual to perform all of these actions in a single job.

```js
uploadBlob(
  state => {
    const date = new Date();
    const id = '0e82962a-6ed0-4a88-92c1-51ae785b4126';
    return `${date.getFullYear()}/${date.getMonth() + 1}/${id}.json`;
  },
  state.data,
  {
    blobHTTPHeaders: { blobContentType: 'application/json' }
  },
  { createContainer: true, overwrite: true }
);

downloadBlob(
   dataValue('blobName');
);

getBlobProperties(
 state => {
    return state.references[1].blobName;
  }
);
```

Run the job as follows:

```bash
openfn job -a azure-storage -s state.json -O
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.

# language-aws-s3 <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
aws-s3 API.

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/aws-s3-docs) for
full technical documentation.

## Usage

Import the adaptor and call its operations inside an OpenFn job. Example
snippets:

Upload a file (sends raw `Body` to S3):

```javascript
upload({ Bucket: 'my-bucket', Key: 'path/file.txt', Body: state.data.blob, ContentType: 'application/octet-stream' })
```

Download a file (result returned as base64 in `state.data`):

```javascript
download({ Bucket: 'my-bucket', Key: 'path/file.txt' })
```

List objects:

```javascript
list({ Bucket: 'my-bucket', Prefix: 'path/' })
```

Delete an object:

```javascript
remove({ Bucket: 'my-bucket', Key: 'path/file.txt' })
```

## Notes

- Authentication: the adaptor uses AWS SDK v3 `S3Client`. It will use the
	default credential provider chain unless `accessKeyId` and
	`secretAccessKey` are provided in `state.configuration`.
- `download` normalizes returned object bodies to base64 under
	`state.data.base64` (and includes `contentType` and `contentLength`).

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/aws-s3-configuration-schema/)
for required and optional `configuration` properties.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.

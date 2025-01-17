# Gmail Message Content Extraction

This adaptor is used to extract specific content from Gmail messages using
custom desired "content" configurations. The sample code specifies how to query
Gmail for messages and identify desired attachments and metadata.

## How It Works

Without any parameters, the `getContentsFromMessages()` function will return an
array containing every message in the account of the authenticated user including
`from`, `date` and subject.

A number of options are available to isolated the messages desired and to
customize the output.

# Options

Optional parameters include: `contents`, `query`, `email`, `processedIds`

## options.contents
### Extracting Message Contents

Use the `options.contents` array to extract the content you'd like to retrieve
from each message. Each item should be a string (ie, `'body'`, `'subject'`) or
an object describing an attachment. Additionally, the contents will always
include `from`, `date`, and `subject`.

### Metadata

The following types of content can be extracted:

- `body`: Extracts the message body.
- `subject`: Extracts the email subject.
- `date`: Extracts the timestamp of the email.
- `from`: Extracts the sender's information.

Optionally, each of these content strings can be expanded to include additional
specifications:

```js
{
  type: 'subject',
  name: 'email-title',
  maxLength: 25,
}
```

- The `type` property instructs the function which content type to extract.
- The `name` property allows you to add a custom name to this information.
- The `maxLength` property allows you to limit the length of the content
  returned.

### Attachment: basic file

Extract content from a file attachment.

`file`: Identify the specific file inside the archive by providing its name as a
string or using a regular expression to matching a pattern.

```js
{
  type: 'file',
  name: 'metadata',
  file: /^summary\.txt$/,
}
```

```js
{
  type: 'file',
  file: 'summary.txt',
  maxLength: 500,
}
```

### Attachment: archived file

Extract content from a file embedded in an archive attachment.

- `archive`: Specify the file name of the archive using either a string for an
  exact match or a regular expression to match a pattern.
- `file`: Identify the specific file inside the archive by providing its name as
  a string or using a regular expression to match a pattern.

```js
{
  type: 'archive',
  name: 'data',
  archive: 'devicedata.zip',
  file: /_CURRENT_DATA_\w*?\.json$/,
  maxLength: 5000,
}
```

## options.query
### Query Setup

Use a `query` parameter to filter the messages returned.

The query syntax supports the same query format as the Gmail `search` box.

```
options.query = 'from:someuser@example.com rfc822msgid:<somemsgid@example.com> is:unread';
```

A full list of supported search operations can be found here:
[Refine searches in Gmail](https://support.google.com/mail/answer/7190)

## options.email
### Optionally specify email address.

Specify the email address used for the Gmail account. This almost always the
same email associated with the authenticated user so this parameter is optional.

```
options.email = '<EMAIL>';
```

## options.processedIds
### Optionally skip message ids.

In some scenarios, it may be necessary to skip certain messages to prevent the
retrieval of duplicate data. Passing an array of messageIds will allow the
function to skip these messages if any of the ids are matched in the returned
messages.

```
options.processedIds = [
  '123',
  '234',
  '345',
];
```

# Example jobs

```js
const query = 'in:inbox newer_than:2d';
const contents = ['body'];
getContentsFromMessages({ query, contents });
```

```js
const subject = 'device data summary'.replace(' ', '+');
const query = `in:inbox subject:${subject} newer_than:1m`;

const email = 'special_admin@gmail.com';

const metadataFile = {
  type: 'file',
  name: 'metadata',
  file: /summary\.txt$/,
  maxLength: 500,
};

const dataFile = {
  type: 'archive',
  name: 'data',
  archive: /_device_data\.zip$/,
  file: /_CURRENT_DATA_\w*?\.json$/,
};

const contents = [metadataFile, dataFile];

getContentsFromMessages({ query, email, contents });
```

# Sample state.data Output

For each matched message, the extracted content is returned as a message object
of content properties. Here's an example `state.data` for a single matched
message:

```js
[
  {
    messageId: '1934c017c1752c01',
    from: 'Friendly Sender <sender@gmail.com>',
    date: '2024-11-20T23:56:08.000Z',
    subject: 'Fwd: FW: Facility Anomaly Report (Summary Data)',
    metadata: {
      filename: 'daily_summary.txt',
      content: '{ "appInfo": { "isAutomaticTime": true }',
    },
    data: {
      archiveFilename: '0031_device_data.zip',
      filename: '0031_CURRENT_DATA_P100DT9H45M46S_20241115T102926Z.json',
      content: '{ "AMOD": "VL45", "AMFR": "ICECO" }',
    },
  },
];
```

Each property on the message object represents a specific piece of information
extracted:

- **from**: Sender's email and name.
- **date**: The timestamp when the email was sent.
- **subject**: Contains the email subject.
- **metadata**: Metadata-named file content, with its matched file name.
- **data**: Data-named archive file content, with its matched archive name and
  file name.

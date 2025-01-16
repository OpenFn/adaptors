# Gmail Message Content Extraction

This adaptor is used to extract specific content from Gmail messages using
custom "desiredContent" configurations. The sample code specifies how to query
Gmail for messages and identify desired attachments and metadata.

## How It Works

1. Gmail Query: Constructs a Gmail query string to filter relevant messages.
2. Desired Content Matching: Uses the desiredContents array to identify and
   extract:
   - Metadata files
   - Archive files and their contents
   - Message metadata (subject, date, from, body)
3. Output: Returns a structured collection of matched content.

## Usage

The adaptor's primary function is `getContentsFromMessages`

```js
getContentsFromMessages(userId, query, desiredContents, callback);
```

1. Set userId with the Gmail account to query.
2. Customize the query to contain filters as needed. This is the same format a
   the query in the Gmail UI.
3. Specify what content to retrieve from messages (body, subject, attachments,
   etc)

## Extracting Message Contents

The `desiredContents` array should list what content to retrieve from each
message. Each item should be a string (ie, `"body"` or an object describing an
attachment)

### Metadata

The following strings can be extracted:

- `body`: Extracts the message body.
- `subject`: Extracts the email subject.
- `date`: Extracts the timestamp of the email.
- `from`: Extracts the sender's information.

### Attachment: basic file

Extract the content from a file attachment. Specify the file name with a regular
expression on the `file` key.

```js
{
  type: "file",
  name: "metadata",
  file: /^summary\.txt$/,
}
```

### Attachment: archived file

Extract the content from a file embedded in an archive attachment.

Specify the archive with a regular expression on the `archive` key. Extract a
file within the archive with the `file` key.

```js
{
  type: "archive",
  name: "data",
  archive: /_device_data\.zip$/,
  file: /_CURRENT_DATA_\w*?\.json$/,
}
```

## Query Setup

The query variable is constructed to filter Gmail messages:

- Inbox messages with the subject containing "30DTR Data".
- Messages sent within the last 31 days.

## Example

```js
const userId = 'tester@gmail.com';

const querySubject = encodeURIComponent('device data summary');

// All messages newer than 30 days ago
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const queryAfterDate = new Date(Date.now() - 30 * MILLISECONDS_PER_DAY)
  .toISOString()
  .split('T')[0];

const query = `in:inbox subject:${querySubject} after:${queryAfterDate}`;

const metadataFile = {
  type: 'file',
  name: 'metadata',
  file: /^summary\.txt$/,
};

const dataFile = {
  type: 'archive',
  name: 'data',
  archive: /_device_data\.zip$/,
  file: /_CURRENT_DATA_\w*?\.json$/,
};

const desiredContents = [
  'body',
  'subject',
  'date',
  'from',
  metadataFile,
  dataFile,
];

getContentsFromMessages(userId, query, desiredContents, state =>
  console.log(state.data)
);
```

## Sample Output

For each matched message, the extracted content is returned in a collection of
content blocks. Here's an example for a single match message:

```js
[
  {
    messageId: '1934c017c1752c01',
    contents: [
      {
        name: 'subject',
        value: 'Fwd: FW: Facility Temperature Report (Summary Data)',
      },
      {
        name: 'date',
        value: '2024-11-20T23:56:08.000Z',
      },
      {
        name: 'from',
        value: 'Friendly Sender <sender@gmail.com>',
      },
      {
        name: 'metadata',
        value:
          '{\n  "appInfo": {\n    "isAutomaticTime": true,\n    "isTrueTime": true,\n    "os": "Android",\n    "osVe" }',
        path: '004800123457501820383131_20241115T102926Z.json',
      },
      {
        name: 'data',
        value:
          '{\n "AMOD": "VL45",\n "AMFR": "ICECO",\n "ASER": "BJBC 08 30",\n "ADOP": "2024-04-01",\n "APQS": "E003/XX" }',
        path: '004800123457501820383131_CURRENT_DATA_P100DT9H45M46S_20241115T102926Z.json',
      },
    ],
  },
];
```

Each content block represents a specific piece of information extracted:

- **subject**: Contains the email subject.
- **date**: The timestamp when the email was sent.
- **from**: Sender's email and name.
- **metadata**: Metadata file content, with its file path.
- **data**: Data file content, with its file path.

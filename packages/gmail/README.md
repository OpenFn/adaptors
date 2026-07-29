# Gmail adaptor

Send and receive Gmail messages with file attachments using simple, configurable
logic.

# `getContentsFromMessages`

This function is used to extract specific content from Gmail messages using
custom desired "content" configurations. The sample code specifies how to query
Gmail for messages and identify desired attachments and metadata.

Without any parameters, the `getContentsFromMessages()` function will return an
array containing every message in the account of the authenticated user
including `from`, `date` and `subject`.

A number of options are available to isolated the desired messages and to
customize the output.

## Parameters

An `options` object can configure the results of the function call. Optional
parameters include: `contents`, `query`, `email`, `processedIds`,
`maxResults`, `fetchAttachments`

### options.contents

Use the `options.contents` array to specify the content to retrieve from each
message. Always included are `from`, `date`, and `subject`.

Each item can be a simple string (ie, `'body'`, `'subject'`) or an
MessageContent object offering advanced configuration.

#### Basic metadata

The following types of content can be extracted:

- `body`: Extracts the message body.
- `subject`: Extracts the email subject.
- `date`: Extracts the timestamp of the email.
- `from`: Extracts the sender's information.

Optionally, each of these content strings can be expanded to include additional
specifications:

```js
const mySubject = {
  type: 'subject',
  name: 'email-title',
  maxLength: 25,
};
```

- The `type` property instructs the function which content type to extract.
- The `name` property allows you to add a custom name to this information.
- The `maxLength` property allows you to limit the length of the content
  returned.

#### Attachment: basic file

Extract content from a file attachment.

Set `file` to a string or regex to match the attached file name.

```js
const myMetadata = {
  type: 'file',
  name: 'metadata',
  file: /^summary\.txt$/,
};
```

Some file types will be parsed automatically:

- JSON files will be parsed into JSON
- XLSX and XLS files will be converted to a simple JSON format (arrays of
  arrays, no headers)
- XML and text files will be parsed into plain text.

Other files will be returned as base64 encoded strings.

You can force attachments to be parsed into `xlsx`, `text`, `json` or `base64`
formats by setting `parseAs`.

```js
const myMetadata = {
  type: 'file',
  file: 'summary.text',
  parseAs: 'json',
};
```

#### Attachment: archived file

Extract content from a file embedded in an archive attachment.

- `archive`: Specify the file name of the archive using either a string for an
  exact match or a regular expression to match a pattern.
- `file`: Identify the specific file inside the archive by providing its name as
  a string or using a regular expression to match a pattern.

```js
const myArchivedFile = {
  type: 'archive',
  name: 'data',
  archive: 'devicedata.zip',
  file: /_CURRENT_DATA_\w*?\.json$/,
  maxLength: 5000,
};
```

```js
options.contents = [mySubject, 'body', myMetadata, myArchivedFile];
```

### options.query

Use a `query` parameter to filter the messages returned.

The query syntax supports the same query format as the Gmail `search` box.

```js
options.query = 'from:ple.com rfc822msgid:<somemsgid@example.com> is:unread';
```

A full list of supported search operations can be found here:
[Refine searches in Gmail](https://support.google.com/mail/answer/7190)

### options.email

Optionally specify the email address used for the Gmail account. This almost
always the same email associated with the authenticated user so this parameter
is optional.

```js
options.email = '<EMAIL>';
```

### options.processedIds

In some scenarios, it may be necessary to skip certain messages to prevent the
retrieval of duplicate data. Passing an array of messageIds will allow the
function to skip these messages if any of the ids are encountered in the
returned messages.

```js
options.processedIds = [
  '194e3cf1ca0ccd66',
  '283e2df2ca0ecd75',
  '572e1af3ca0bcd84',
];
```

### options.maxResults

To prevent inadventant massive retrieval of messages, you can limit the number
of results returned. The default value is 1000.

This works in conjuction with the `options.processedIds` parameter. For example:

- account contains messages [1, 2, 3]
- `options.processedIds = [1];`
- `options.maxResults = 1;`
- this will skip message #1 and resulting dataset will contain a single message
  #2

### options.fetchAttachments

Set `fetchAttachments` to `false` to return message IDs and non-attachment
content without downloading requested file or archive attachments. The default
is `true`.

When downloading is disabled, matched attachments are still reported as
filename-only objects (without `content`), so a later job can tell which
messages contain the target attachment:

- matched file → `{ filename: 'report.xlsx' }`
- matched archive → `{ archiveFilename: 'data.zip' }`
- no match → `null`

Pair this with `getMessageById` in a follow-up job to download the attachment
for exactly the message identified here.

```js
getContentsFromMessages({
  query: 'after:2026/07/01',
  contents: [
    'body',
    { type: 'file', name: 'report', file: /\.xlsx$/ },
  ],
  fetchAttachments: false,
});
```

## Example jobs

```js
const query = 'in:inbox newer_than:2d';
const contents = ['body'];
const maxResults = 200;
getContentsFromMessages({ query, contents, maxResults });
```

```js
const subject = 'device data summary'.replace(' ', '+');
const query = `in:inbox subject:${subject} newer_than:1m`;

const email = 'special_assigned_delegate@gmail.com';

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

## Sample `state.data` output

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

# `sendMessage`

Use `sendMessage()` to send an email with optional file attachments. This
function supports plain text messages as well as attachments and archives.

## Parameters

Pass a single `message` object with the following fields:

- `to` (string): Required. The recipient's email address.
- `subject` (string): Required. The email subject.
- `body` (string): Required. The message body as plain text.
- `attachments` (array): Optional. List of file attachments or archives.

Each item in the `attachments` array must include:

- `filename` (string): The name of the file.
- Either `content` or `archive`:
  - `content` (string): The file content.
  - `archive` (array): Use this to send a `.zip` file. Provide an array of
    `{ filename, content }` objects.

## Example jobs

```js
sendMessage({
  to: 'recipient@gmail.com',
  subject: 'Device Summary',
  body: 'Here is the latest device summary.',
  attachments: [
    {
      filename: 'summary.txt',
      content: 'This is the summary file.',
    },
    {
      filename: 'report.json',
      content: '{ "status": "OK" }',
    },
    {
      filename: 'data.zip',
      archive: [
        {
          filename: 'one.json',
          content: '{ "value": 1 }',
        },
        {
          filename: 'two.json',
          content: '{ "value": 2 }',
        },
      ],
    },
  ],
});
```

This will send an email with two plain attachments and one ZIP archive
containing two files.

# `getMessageById`

Fetch a single message by its Gmail API message id, instead of searching with
a query. Takes the same `contents`, `email` and `fetchAttachments` options as
`getContentsFromMessages`, and returns a single message object (rather than an
array) on `state.data`.

This is the id returned by this adaptor as `messageId` on each result. It is
not the RFC 822 `Message-ID` header, so it cannot be matched with the
`rfc822msgid:` search operator.

This pairs with `getContentsFromMessages`'s `fetchAttachments: false` for a
two-step pattern: one job lists messages cheaply and records which contain a
target attachment, and a later job downloads the attachment for one message at
a time:

```js
getMessageById($.data.find(m => m.report).messageId, {
  contents: [{ type: 'file', name: 'report', file: /\.xlsx$/ }],
});
```

# Acquiring an access token

The Gmail adaptor implicitly uses the Gmail account of the Google account that
is used to authenticate the application.

Allowing the Gmail adaptor to access a Gmail account is a multi-step process.

## Create an OAuth 2.0 client ID

Follow the instructions are found here:
https://support.google.com/googleapi/answer/6158849

- Go to [Google Cloud Platform Console](https://console.cloud.google.com/)
- Go to "APIs & Services"
- Click "Credentials"
- Click "Create Credentials"
- Select "OAuth client ID"
- Select "Create OAuth client ID"
- Select Application type "Web application"
  - Add a uniquely-identifiable name
  - Click "Create"
- On the resulting popup screen, find and click "DOWNLOAD JSON" and save this
  file to a secure location.

## Retrieve an access token

- Navigate to
  [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).
- Find _Step 1 Select & authorize APIs_:
  - Find the section for _Gmail API v1_.
  - Mark the following two scopes:
    - https://www.googleapis.com/auth/gmail.readonly
    - https://www.googleapis.com/auth/gmail.send
  - In the box labeled with the watermark _Input your own scopes_ add `openid`.
  - Click on the **Authorize APIs** button.
  - Log in to the Google account to which you want to grant access.
  - On the _Sign in to Google OAuth 2.0 Playground_ screen, Click **Continue**.
  - On the _Google OAuth 2.0 Playground wants access to your Google Account_
    screen:
    - **Select all**, including:
      - **View your email messages and settings**.
      - **Send email on your behalf**.
    - Click **Continue**.
- Find _Step 2 Exchange authorization code for tokens_:
  - _Authorization code_ will be prepopulated.
  - Click **Exchange authorization code for tokens**.
  - _Refresh token_ and _Access token_ will be populated briefly before the
    interface automatically advances to _Step 3 Configure request to API_. To
    view the _Access token_, return to _Step 2 Exchange authorization code for
    tokens_.
- The _Access token_ is valid for 1 hour. You may enable **Auto-refresh the
  token before it expires** or manually refresh it using the **Refresh access
  token** button.

## Configure OpenFn CLI to find the access token

The Gmail adaptor looks for the access token in the configuration section under
`access_token`.

Example configuration using a workflow:

```
"workflow": {
  "steps": [
    {
      "id": "getGmailContent",
      "adaptors": [
        "gmail"
      ],
      "expression": "path/to/gmail.js",
      "configuration": {
        "access_token": "[access token acquired from previous section]"
      }
    }
  ]
}
```

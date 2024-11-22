# Gmail Message Content Extraction

This adaptor is used to extract specific content from Gmail messages using custom "desiredContent" configurations. The sample code specifies how to query Gmail for messages and identify desired attachments and metadata.

---

## Code Overview

### Key Configurations

- **Basic File**: 
  - Type: file
  - Purpose: Extract the content from a file attachment.
  - Parameters:
    - file: Regex to isolate the file attachment: `/^summary\.txt$/`

- **Archived File**:
  - Type: archive
  - Purpose: Extract a file embedded in an archive attachment.
  - Parameters:
    - archive: Regex to isolate the archive: `/_varo_data\.zip$/`
    - file: Regex to isolate the file inside the archive: `/_CURRENT_DATA_\w*?\.json$/`

- **Other Metadata Extracted**:
  - Body: Extracts the message body.
  - Subject: Extracts the email subject.
  - Date: Extracts the timestamp of the email.
  - From: Extracts the sender's information.

### Query Setup

The query variable is constructed to filter Gmail messages:
- Inbox messages with the subject containing "30DTR Data".
- Messages sent within the last 31 days.

### Sample Configuration

The desiredContents array specifies what content blocks to extract from matching messages:

```js
const userId = "tester@gmail.com";

const querySubject = encodeURIComponent("device data summary");

// All messages newer than 30 days ago.
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const queryAfterDate = new Date(Date.now() - 30 * MILLISECONDS_PER_DAY)
  .toISOString()
  .split("T")[0];

const query = `in:inbox subject:${querySubject} after:${queryAfterDate}`;

const metadataFile = {
  type: "file",
  name: "metadata",
  file: /^summary\.txt$/,
};

const dataFile = {
  type: "archive",
  name: "data",
  archive: /_device_data\.zip$/,
  file: /_CURRENT_DATA_\w*?\.json$/,
};

const body = { type: "body", name: "body" };
const subject = { type: "subject", name: "subject" };
const date = { type: "date", name: "date" };
const from = { type: "from", name: "from" };

const desiredContents = [subject, date, from, metadataFile, dataFile];

getContentsFromMessages(userId, query, desiredContents, (state) => console.log(state.data));
```

---

## Sample Output

For each matched message, the extracted content is returned in a collection of content blocks. Here's an example for a single match message:

```js
[
  {
    "messageId": "1934c017c1752c01",
    "contents": [
      {
        "name": "subject",
        "value": "Fwd: FW: Facility Temperature Report (Summary Data)"
      },
      {
        "name": "date",
        "value": "2024-11-20T23:56:08.000Z"
      },
      {
        "name": "from",
        "value": "Friendly Sender <sender@gmail.com>"
      },
      {
        "name": "metadata",
        "value": "{\n  \"appInfo\": {\n    \"isAutomaticTime\": true,\n    \"isTrueTime\": true,\n    \"os\": \"Android\",\n    \"osVe\" }",
        "path": "004800123457501820383131_20241115T102926Z.json"
      },
      {
        "name": "data",
        "value": "{\n \"AMOD\": \"VL45\",\n \"AMFR\": \"ICECO\",\n \"ASER\": \"BJBC 08 30\",\n \"ADOP\": \"2024-04-01\",\n \"APQS\": \"E003/XX\" }",
        "path": "004800123457501820383131_CURRENT_DATA_P100DT9H45M46S_20241115T102926Z.json"
      }
    ]
  }
]
```

---

## Explanation of Content Blocks

Each content block represents a specific piece of information extracted:
- **subject**: Contains the email subject.
- **date**: The timestamp when the email was sent.
- **from**: Sender's email and name.
- **metadata**: Metadata file content, with its file path.
- **data**: Data file content, with its file path.

---

## How It Works

1. Gmail Query: Constructs a Gmail query string to filter relevant messages.
2. Desired Content Matching: Uses the desiredContents array to identify and extract:
   - Metadata files
   - Archive files and their contents
   - Message metadata (subject, date, from, body)
3. Output: Returns a structured collection of matched content.

---

## Usage

1. Set userId: Update the userId variable with the Gmail account to query.
2. Customize Query: Adjust the query to contain filters as needed. This is the same format a the query in the Gmail UI.
3. Run Script: Use the provided configuration to extract desired content from Gmail.

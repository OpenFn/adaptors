# language-varo <img src='./assets/square.png' width="30" height="30"/>

The Varo adaptor is designed to work in conjunction with the Gmail adaptor.

The following workflows have been illustrated:
- Gmail -> EMS report
  Take proprietary data formats found in Gmail messages and convert them to EMS-compliant format.
- CCDX data collection -> Gmail
  Retrieve data found in an OpenFn collection, convert it to a EMS report, assemble it as a Varo package and send it to a Varo inbox to be processed by Pogo LT.

# Gmail -> EMS report

This will demonstrate how to pull messages from a Gmail account and pass them to the Varo adaptor which will convert them into EMS format to be used for downstream consumers in the workflow.

The workflow requires some pre-configuration, namely the Gmail `access_token` and the OpenFn `collection_token`.

## Example workflow

Place these files in the openfn/adaptors/workflows/readVaroPackages folder.

### workflow.json

```js
{
  "options": {
    "start": "getContentsFromMessages"
  },
  "workflow": {
    "steps": [
      {
        "id": "getContentsFromMessages",
        "adaptors": [
          "gmail",
          "collections"
        ],
        "expression": "jobGmail.js",
        "configuration": {
          "access_token": "[redacted]"
        },
        "next": {
          "convertToEms": "Array.isArray(state.data) && state.data.length > 0"
        }
      },
      {
        "id": "convertToEms",
        "adaptor": "varo",
        "expression": "jobVaro.js",
      }
    ],
    "credentials": {
      "collections_endpoint": "http://localhost:4000/collections",
      "collections_token": "[redacted]"
    }
  }
}
```

### jobGmail.js

This job will define message parts of interest including: metadata, data and fridgeTag. Also important is a collection of previously-processed messageIds. This job will grab ids from the `gmail-processed-ids` collection and pass them into the request. Once the request is complete, the new, processed messageIds are placed into the collection for future retrieval.

```js
const contents = [
  { name: "metadata", file: /\d{12}_\d{8}T\d{6}Z\.json$/ },
  { name: "data", file: /_CURRENT_DATA_.*\.json$/ },
  {
    name: "data",
    archive: /_varo_data\.zip$/,
    file: /_CURRENT_DATA_.*\.json$/,
  },
  { name: "fridgeTag", file: /\d{12}_\d{12}_\d{8}T\d{6}Z\.txt$/ },
];

const collectionName = "gmail-processed-ids";
const itemName = "processedIds";

collections.get(collectionName, itemName);

getContentsFromMessages({
  contents,
  processedIds: $.data,
});

fnIf(
  (state) => Array.isArray(state.processedIds),
  collections.set(collectionName, itemName, $.processedIds)
);
```

### jobVaro.js

The function `convertToEms` expects an array of message contents. This property contains text files in EMS-like Varo format or FridgeTag format and transforms them into EMS-structured data. Tip: This format is automatically provided by the Gmail adaptor. 

Expected data structure:

```js
[
  {
    metadata: {
      content: '',
      filename: '',
    },
    data: {
      content: '',
      filename: '',
    },
  },
]
```


```js
convertToEms($.data);

fn((state) => {
  console.log(state.data);
  return state;
});
```

# CCDX data collection -> Gmail

Following is an example demonstrating how to retrieve data found in an OpenFn collection, convert it to a EMS report, assemble it as a Varo package and send it to a Varo inbox to be processed by Pogo LT.

## Example workflow

Place these files in the openfn/adaptors/workflows/sendVaroPackage folder.

### workflow.js
```js
{
  "workflow": {
    "steps": [
      {
        "id": "convertRecordsToMessageContent",
        "adaptor": "varo",
        "expression": "jobVaro.js",
        "next": {
          "sendMessage": "state.data != null"
        }
      },
      {
        "id": "sendMessage",
        "adaptor": "gmail",
        "expression": "jobGmail.js",
        "configuration": {
          "access_token": "[redacted]"
        }
      }
    ]
  }
}
```

### jobVaro.js

```js
// Pull the data from the collection into the state.
collections.get("ccdx-ems", "*");

// Convert the raw collection records into an EMS report.
convertRecordsToReport($.data);

// Convert the EMS report to message contents (subject, data file).
convertReportToMessageContent($.data, "ems");
```

### jobGmail.js

```js
fn((state) => {
  const { subject, data } = state.data;

  /*
    subject = "OpenFn | EMS";
    data = {
      filename: "data.json", 
      content: "{ ... EMS report converted to JSON string ... }",
    };
  */
 
  // Compress the data.json file into a ZIP file.
  const dataArchive = {
    filename: "data.zip",
    archive: [data],
  };

  state.data = {
    to: "receiver@gmail.com",
    subject,
    attachments: [dataArchive],
  };

  return state;
});

sendMessage($.data);
```

# Running workflow

We can look in more detail at the Gmail -> EMS report workflow and illustrate some advanced techniques to enhance the development experience and operation.

## Basics

The `-m` flag tells OpenFn to use the monorepo instead of its own adaptor cache.

```
cd openfn/adaptors/workflows/readVaroPackages
openfn workflow.json -m
```

## Advanced workflow operation

It's beneficial to isolate the Varo adaptor during development to avoid the redundant step of repeatedly querying Gmail which also requires refreshing the access token each hour. We can use advanced functionality of the OpenFn CLI to cache the output of the Gmail step which will enable us reuse its output while we are enhancing the Varo adaptor.

### Cache the output from a step

We can configure the workflow to retrieve this message content from a local file which will bypass the need to use the Gmail adaptor to retrieve this information.

- `-m` Use the monorepo.
- `--cache-steps` Direct the CLI to cache the job output.
- `--only getContentsFromMessages` Execute only the getContentsFromMessage step.

```
openfn workflow.json -m --cache-steps --only getContentsFromMessages
```

### Running with a cached step

- `-m` Use the monorepo.
- `--only convertToEms` Execute only the convertToEms step.

```
openfn workflow.json -m --only convertToEms
```

# Token configuration

Some workflows required authorization to access the resources.

## Gmail token

Use Postman to retrieve an access token. This is a short-lived token will last 60 minutes and will have to be manually retrieved. See the documentation in the [Gmail adaptor readme](https://docs.openfn.org/adaptors/packages/gmail-readme#use-the-postman-application-to-query-the-oauth-enpoint-and-retrieve-an-access-token) for a guide on how to configure Postman to retrieve the access token.

## OpenFn collections token

A workflow may track the previously processed messages by storing the processed IDs in an OpenFn collection. OpenFn requires authorization to access a given collection.

1. Access the [Collections](http://localhost:4000/settings/collections) configuration in the administration area.
1. Ensure the collection named `gmail-processed-ids` exists.
1. Create a new token in the [Personal Access Tokens](http://localhost:4000/profile/tokens) configuration.

# Enhancing/developing the Varo adaptor

These instructions will illustrate how to install OpenFn and the adaptor monorepo. The monorepo gives you access to in-development versions of the adaptors.

Recommended folder structure:

```
openfn
├── lightning
└── adaptors
    ├── adaptors
    └── workflows
```

## Install OpenFn

Prerequisite is Docker in installed, up-to-date, and running on your computer.

### Clone the Lightning repository

```
cd openfn
git clone https://github.com/OpenFn/lightning.git
```

### Build the containers

This will build three docker containers:

1. lightning-web
1. postgres
1. ws-worker

```
docker compose build && docker compose run --rm web mix ecto.migrate
docker compose up -d
```

The web application will be running on [localhost port 4000](http://localhost:4000).

## Install the monorepo

To use the monorepo locally you'll need some prerequesite build tools installed.

### Prerequesites

asdf, nodejs, pnpm

```
git clone https://github.com/asdf-vm/asdf.git ~/.asdf

asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf plugin-add pnpm
```

### Clone the monorepo repository

```
cd openfn/adaptors
git clone https://github.com/OpenFn/adaptors.git
```

### Install the build tools

```
asdf install # Install tool versions
pnpm install
pnpm build
pnpm run setup
```

### Switch to the working branch of the varo adaptor

```
cd openfn/adaptors/adaptors
git checkout nhgh-varo
```


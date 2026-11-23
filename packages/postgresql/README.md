# language-postgresql <img src='./assets/square.png' width="30" height="30"/>

Language Pack for building expressions and operations to run PostgreSQL queries.

## Documentation

## required configuration for Heroku postgres

```json
{
  "host": "some-host-url.compute-1.amazonaws.com",
  "port": "5432",
  "database": "wouldntyouliketoknow",
  "user": "me",
  "password": "noway",
  "ssl": true,
  "allowSelfSignedCert": true
}
```

## Connecting through an SSH tunnel

If the database can only be reached through an SSH server (a bastion or jump
host), set `sshHost` in the configuration. The adaptor connects to the SSH
server and sends postgres traffic over that SSH connection (without opening a
local port).

`host` and `port` then name the database **as the SSH server sees it**, often
`localhost`. They default to `localhost` and `5432`.

```json
{
  "host": "localhost",
  "port": 5432,
  "database": "mydb",
  "user": "me",
  "password": "noway",
  "sshHost": "bastion.example.com",
  "sshPort": 22,
  "sshUsername": "tunnel",
  "sshPrivateKey": "-----BEGIN OPENSSH PRIVATE KEY-----\n...\n-----END OPENSSH PRIVATE KEY-----\n",
  "sshHostKey": "SHA256:abc..."
}
```

| Key             | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `sshHost`       | The SSH server. Setting it turns the tunnel on.                              |
| `sshPort`       | The SSH port. Defaults to 22.                                                |
| `sshUsername`   | The SSH username.                                                            |
| `sshPrivateKey` | The private key contents (not a file path).                                  |
| `sshPassphrase` | Optional. The passphrase for an encrypted private key.                       |
| `sshHostKey`    | Optional but recommended. The SSH server's host key fingerprint (see below). |

### Verifying the SSH server

Set `sshHostKey` to the server's SHA256 fingerprint, as `ssh-keygen -lf` prints
it (for example `SHA256:abc...`). The `SHA256:` prefix and any trailing `=` are
optional. If the server presents a different key, the adaptor refuses to connect
before it sends any credentials.

If `sshHostKey` is not set, **any host key is accepted**, which leaves the
connection open to interception. The adaptor logs the fingerprint it saw so you
can copy it into `sshHostKey`.

## SSL certificates and connection timeout

When `ssl` is on and `host` is an IP address, the adaptor checks that the
server's certificate is issued for that IP address. This applies to every
connection, with or without SSH, and is skipped when `allowSelfSignedCert` is
on.

This can break a connection that uses all of these: `ssl` on,
`allowSelfSignedCert` off, an IP address as `host`, and a certificate that names
`localhost` but not that IP address. To fix it, reissue the certificate with the
IP address in its subject alternative names, or connect by a hostname the
certificate names.

The adaptor gives up connecting to postgres after 30 seconds, rather than
waiting forever for a server that never answers.

## `sql(query)`

Execute an sql query. An option can be added to either log the query or not and
either execute the query or no. The options can be omitted as well.

#### sample usage

```js
sql(
  state =>
    `INSERT INTO untitled_table (name, the_geom) VALUES ('` +
    dataValue('form.first_name')(state) +
    `', ST_SetSRID(ST_Point(` +
    dataValue('lat')(state) +
    `, ` +
    dataValue('long')(state) +
    `),4326))`,
  { writeSql: true, execute: true },
);
```

## Find a single value for a table

This helper function allows to build a specific query where `sql` would not be
best suited. It returns a single value and not a promise. An example of usage
would be in building a mapping object with a value from a lookup table.

```js
alterState(async state => {
  const user = {
    id: 1,
    name: 'Mamadou',
    user_id: await findValue({
      uuid: 'id',
      relation: 'users',
      where: { first_name: 'Mama%' },
      operator: { first_name: 'like' }, // operator is optional. "=" is used by default.
    })(state),
  };

  return upsert(...)(state);
});
```

## Insert a single record

This functions is used to insert a single record in postgres database. An option
`writeSql` allows to log the generated sql query. The `setNull` option allows to
replace the specified elements with `NULL`.

```js
insert(
  'users',
  {
    email: 'antony@gmail.com',
    first_name: 'Antony',
    inserted_at: '2020-08-27 00:00:00',
    updated_at: '2020-08-27 00:00:00',
  },
  { setNull: ["''", "'undefined'"], writeSql: true, logValues: true },
);
```

## Insert or Update using a unique column as a key

Insert or Update if matched. An option, `execute`, allows to either run the
generated query or no.

```js
upsert(
  'users',
  'email',
  {
    email: 'luca@openfn.org',
    first_name: 'Luca',
    inserted_at: '2010-01-01 00:00:00',
    updated_at: '2010-01-01 00:00:00',
  },
  {
    setNull: ["'NaN'", "'undefined'"],
    writeSql: false,
    execute: true,
    logValues: true,
  },
);
```

## Insert or Update if a value exist in the record

This function will upsert a record only if the logical given is true. In this
case we check if `dataValue('name')` exists.

```js
upsertIf(dataValue('name'), 'users', 'ON CONSTRAINT users_pkey', {
  name: 'Elodie',
  id: 7,
});
```

## Insert many records in postgresql

This function allows the insert of a set of records inside a table all at once.

```js
insertMany(
  'users',
  state =>
    state.data.people.map(s => {
      return {
        first_name: ['Luca', 'Mohamed', 'Elodie'],
        inserted_at: '2020-01-01 00:00:00',
        updated_at: '2020-01-01 00:00:00',
      };
    }),
  { logValues: true },
);
```

## Upsert many records in postgresql

This function allows the upsert of a set of records inside a table all at once.

```js
upsertMany('users', 'ON CONSTRAINT users_pkey', state =>
  state.data.people.map(s => {
    return {
      first_name: ['Luca', 'Mohamed', 'Elodie'],
      inserted_at: '2020-01-01 00:00:00',
      updated_at: '2020-01-01 00:00:00',
    };
  }),
);
```

## Describe a table from postgres

This function is used to fetch the list of columns of a given table in the
database.

```js
describeTable('users', { writeSql: true, execute: false });
```

## Create a table in the database

This function allows to create a table in a database from a given array of
columns. The key `identity` can be use for a column to auto-generate a value.

```js
insertTable('users', state =>
  state.data.map(column => ({
    name: column.name,
    type: column.type,
    required: true, // optional
    unique: false, // optional - set to true for unique constraint
  })),
);
```

## Alter a table in the database

This function allows to add new columns to a table. Beware of the fact that you
cannot add new columns with names that already exist in the table.

```js
modifyTable(
  'users',
  state =>
    state.data.map(newColumn => ({
      name: newColumn.name,
      type: newColumn.type,
      required: true, // optional
      unique: false, // optional - set to true for unique constraint
    })),
  { writeSql: false, execute: true },
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

To try the SSH tunnel against a real postgres that is only reachable over SSH,
see `test/ssh`.

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`

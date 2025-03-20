<dl>
<dt>
    <a href="#addcontact">addContact(params, callback)</a></dt>
<dt>
    <a href="#sendbroadcast">sendBroadcast(params, callback)</a></dt>
<dt>
    <a href="#startflow">startFlow(params, callback)</a></dt>
<dt>
    <a href="#upsertcontact">upsertContact(params, callback)</a></dt>
</dl>


## Functions
### addContact

<p><code>addContact(params, callback) ⇒ Operation</code></p>

Adds a new contact to RapidPro


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to create the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example**
```js
addContact({
  name: "Mamadou",
  language: "ENG",
  urns: ["tel:+250788123123"]
});
```

* * *

### sendBroadcast

<p><code>sendBroadcast(params, callback) ⇒ Operation</code></p>

Sends a message to a list of contacts and/or URNs


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to create the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example**
```js
sendBroadcast({
  text: "Hello world",
  urns: ["twitter:sirmixalot"],
  contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
});
```

* * *

### startFlow

<p><code>startFlow(params, callback) ⇒ Operation</code></p>

Start a RapidPro flow for a number of contacts


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to create the new resource |
| callback | <code>function</code> | (Optional) callback function |

**Example**
```js
startFlow({
  flow: "f5901b62-ba76-4003-9c62-72fdacc1b7b7",
  restart_participants: false,
  contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
});
```

* * *

### upsertContact

<p><code>upsertContact(params, callback) ⇒ Operation</code></p>

Upserts a contact to RapidPro by URN


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | data to upsert a contact |
| callback | <code>function</code> | (Optional) callback function |

**Example**
```js
upsertContact({
  name: "Mamadou",
  language: "ENG",
  urns: ["tel:+250788123123"]
});
```

* * *



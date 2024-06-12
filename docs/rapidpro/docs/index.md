## Functions

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

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#each">each()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#field">field()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fields">fields()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fn">fn()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fnif">fnIf()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#http">http()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## addContact

addContact(params, callback) ⇒ <code>Operation</code>

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

## sendBroadcast

sendBroadcast(params, callback) ⇒ <code>Operation</code>

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

## startFlow

startFlow(params, callback) ⇒ <code>Operation</code>

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

## upsertContact

upsertContact(params, callback) ⇒ <code>Operation</code>

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


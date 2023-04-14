## Functions

<dl>
<dt>
    <a href="#addContact">addContact(params, callback)</a></dt>
<dt>
    <a href="#sendBroadcast">sendBroadcast(params, callback)</a></dt>
<dt>
    <a href="#startFlow">startFlow(params, callback)</a></dt>
<dt>
    <a href="#upsertContact">upsertContact(params, callback)</a></dt>
</dl>

## addContact

addContact(params, callback) ⇒ <code>Operation</code>
Adds a new contact to RapidPro

**Kind**: global function  
**Access**: public  

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

**Kind**: global function  
**Access**: public  

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

**Kind**: global function  
**Access**: public  

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

**Kind**: global function  
**Access**: public  

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


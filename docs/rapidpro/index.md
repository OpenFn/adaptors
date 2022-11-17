<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute(operations)](#module_Adaptor.execute) ⇒ <code>Operation</code>
    * [.addContact(params, callback)](#module_Adaptor.addContact) ⇒ <code>Operation</code>
    * [.upsertContact(params, callback)](#module_Adaptor.upsertContact) ⇒ <code>Operation</code>
    * [.startFlow(params, callback)](#module_Adaptor.startFlow) ⇒ <code>Operation</code>
    * [.sendBroadcast(params, callback)](#module_Adaptor.sendBroadcast) ⇒ <code>Operation</code>

<a name="module_Adaptor.execute"></a>

### Adaptor.execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  

| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
execute(
  create('foo'),
  delete('bar')
)(state)
```
<a name="module_Adaptor.addContact"></a>

### Adaptor.addContact(params, callback) ⇒ <code>Operation</code>
Adds a new contact to RapidPro

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.upsertContact"></a>

### Adaptor.upsertContact(params, callback) ⇒ <code>Operation</code>
Upserts a contact to RapidPro by URN

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.startFlow"></a>

### Adaptor.startFlow(params, callback) ⇒ <code>Operation</code>
Start a RapidPro flow for a number of contacts

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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
<a name="module_Adaptor.sendBroadcast"></a>

### Adaptor.sendBroadcast(params, callback) ⇒ <code>Operation</code>
Sends a message to a list of contacts and/or URNs

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
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

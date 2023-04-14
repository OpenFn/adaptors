## Functions

<dl>
<dt><a href="#addContact">addContact(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Adds a new contact to RapidPro</p>
</dd>
<dt><a href="#sendBroadcast">sendBroadcast(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Sends a message to a list of contacts and/or URNs</p>
</dd>
<dt><a href="#startFlow">startFlow(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Start a RapidPro flow for a number of contacts</p>
</dd>
<dt><a href="#upsertContact">upsertContact(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Upserts a contact to RapidPro by URN</p>
</dd>
</dl>

<a name="addContact"></a>

## addContact(params, callback) ⇒ <code>Operation</code>
Adds a new contact to RapidPro

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>data to create the new resource</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
addContact({
  name: "Mamadou",
  language: "ENG",
  urns: ["tel:+250788123123"]
});
```

* * *

<a name="sendBroadcast"></a>

## sendBroadcast(params, callback) ⇒ <code>Operation</code>
Sends a message to a list of contacts and/or URNs

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>data to create the new resource</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
sendBroadcast({
  text: "Hello world",
  urns: ["twitter:sirmixalot"],
  contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
});
```

* * *

<a name="startFlow"></a>

## startFlow(params, callback) ⇒ <code>Operation</code>
Start a RapidPro flow for a number of contacts

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>data to create the new resource</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
startFlow({
  flow: "f5901b62-ba76-4003-9c62-72fdacc1b7b7",
  restart_participants: false,
  contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
});
```

* * *

<a name="upsertContact"></a>

## upsertContact(params, callback) ⇒ <code>Operation</code>
Upserts a contact to RapidPro by URN

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>data to upsert a contact</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
upsertContact({
  name: "Mamadou",
  language: "ENG",
  urns: ["tel:+250788123123"]
});
```

* * *


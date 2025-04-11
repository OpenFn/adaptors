<dl>
<dt>
    <a href="#getitemswithstats">getItemsWithStats(variables)</a></dt>
<dt>
    <a href="#insertoutboundshipment">insertOutboundShipment(variables)</a></dt>
<dt>
    <a href="#query">query(query, variables)</a></dt>
<dt>
    <a href="#upsertoutboundshipment">upsertOutboundShipment(variables)</a></dt>
</dl>


## Functions
### getItemsWithStats

<p><code>getItemsWithStats(variables) ⇒ Operation</code></p>

Get the list of items in the catalogue


| Param | Type | Description |
| --- | --- | --- |
| variables | [<code>GetItemsVariables</code>](#getitemsvariables) | GraphQL query variables |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Get items in the catalogue
```js
getItemsWithStats({
       "key": "name",
       "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C",
})
```

* * *

### insertOutboundShipment

<p><code>insertOutboundShipment(variables) ⇒ Operation</code></p>

Create an outbound shipment.


| Param | Type | Description |
| --- | --- | --- |
| variables | [<code>InsertOutboundShipmentvariables</code>](#insertoutboundshipmentvariables) | GraphQL query variables |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Create an outbound shipment
```js
insertOutboundShipment({
       "otherPartyId": "861102F624354F15ABEB48DC207A4C2D",
       "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C"
})
```

* * *

### query

<p><code>query(query, variables) ⇒ Operation</code></p>

Make a generic GraphQL request


| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | GraphQl query string |
| variables | <code>Object</code> | GraphQl query variables |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example**
```js
query(`
  query isCentralServer {
    isCentralServer
  }`
)
```

* * *

### upsertOutboundShipment

<p><code>upsertOutboundShipment(variables) ⇒ Operation</code></p>

Update an outbound shipment


| Param | Type | Description |
| --- | --- | --- |
| variables | [<code>UpsertOutboundShipmentvariables</code>](#upsertoutboundshipmentvariables) | GraphQL query variables |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |
**Example:** Update outbound shipment status to 'PICKED'
```js
upsertOutboundShipment({
     "storeId": "DFE0F611AD84A0419D36F8FEFAD1894C",
     "input": {
       "updateOutboundShipments": [
         {
           "id": "01961fce-9ef6-7198-93c1-866395094e48",
           "status": "PICKED"
          }
        ]
     }
})
```

* * *


##  Interfaces

### GetItemsVariables
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The unique key of each item in the list |
| storeId | <code>string</code> | The msupply store id  the list is being fetched from |


* * *

### HttpState

State object

**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response body |
| response | the response from the HTTP server, including headers, statusCode, body, etc |
| references | an array of all previous data objects used in the Job |


* * *

### InsertOutboundShipmentvariables
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| otherPartyId | <code>string</code> | The recieving party id |
| storeId | <code>string</code> | The id of the store the shipment is being made from |


* * *

### RequestBody
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The GraphQL query string |
| variables | <code>object</code> | The variables for that query string |


* * *

### UpsertOutboundShipmentvariables
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| input | <code>Object</code> | The payload for the target shipment |
| storeId | <code>string</code> | The id of the store the shipment is being made from |


* * *


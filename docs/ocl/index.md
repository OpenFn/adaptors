<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * _static_
        * [.execute(operations)](#module_Adaptor.execute) ⇒ <code>Operation</code>
        * [.map(state, [params])](#module_Adaptor.map) ⇒ <code>Operation</code>
            * [~retrievedMapping](#module_Adaptor.map..retrievedMapping)
    * _inner_
        * [~auth](#module_Adaptor..auth)
        * [~params](#module_Adaptor..params)

<a name="module_Adaptor.execute"></a>

### Adaptor.execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.

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
<a name="module_Adaptor.map"></a>

### Adaptor.map(state, [params]) ⇒ <code>Operation</code>
Replaces source keys(data elements) to destination keys(data elements) with out changing state.data structure

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | Json object containing keys and data values; |
| [params] | <code>Object</code> | E.g. `{users:"haftamuk", sources: "eCHIS-CODES", concepts: "fp_new_at_10_to_14" } |

**Example**  
```js
mapp(state, state)
```
<a name="module_Adaptor.map..retrievedMapping"></a>

#### map~retrievedMapping
In order to minimize web trafic, already accessed mapping
information is put into this variable to
reuse values for the consucutive keys.

**Kind**: inner constant of [<code>map</code>](#module_Adaptor.map)  
<a name="module_Adaptor..auth"></a>

### Adaptor~auth
Do we have a mechanism to retrieve those from configuration

**Kind**: inner property of [<code>Adaptor</code>](#module_Adaptor)  
<a name="module_Adaptor..params"></a>

### Adaptor~params
Specify query parameters that may include OCL Data Source, MappingType, includion and exclusion values

**Kind**: inner property of [<code>Adaptor</code>](#module_Adaptor)  

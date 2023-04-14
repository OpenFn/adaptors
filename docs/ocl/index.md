## Members

<dl>
<dt><a href="#auth">auth</a></dt>
<dd><p>Do we have a mechanism to retrieve those from configuration</p>
</dd>
<dt><a href="#params">params</a></dt>
<dd><p>Specify query parameters that may include OCL Data Source, MappingType, includion and exclusion values</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#map">map(state, [params])</a> ⇒ <code>Operation</code></dt>
<dd><p>Replaces source keys(data elements) to destination keys(data elements) with out changing state.data structure</p>
</dd>
</dl>

<a name="auth"></a>

## auth
Do we have a mechanism to retrieve those from configuration

**Kind**: global variable  

* * *

<a name="map"></a>

## map(state, [params]) ⇒ <code>Operation</code>
Replaces source keys(data elements) to destination keys(data elements) with out changing state.data structure

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | Json object containing keys and data values; |
| [params] | <code>Object</code> | E.g. `{users:"haftamuk", sources: "eCHIS-CODES", concepts: "fp_new_at_10_to_14" } |

**Example**  
```js
mapp(state, state)
```

* * *

<a name="map..retrievedMapping"></a>

### map~retrievedMapping
In order to minimize web trafic, already accessed mapping
information is put into this variable to
reuse values for the consucutive keys.

**Kind**: inner constant of [<code>map</code>](#map)  

* * *

<a name="params"></a>

## params
Specify query parameters that may include OCL Data Source, MappingType, includion and exclusion values

**Kind**: global variable  

* * *


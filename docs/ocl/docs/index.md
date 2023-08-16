## Functions

<dl>
<dt>
    <a href="#get">get(path, query, callback)</a></dt>
<dt>
    <a href="#getMappings">getMappings(ownerId, repositoryId, [options], callback)</a></dt>
</dl>

## get

get(path, query, callback) ⇒ <code>Operation</code>
Get a resource in OCL

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource |
| query | <code>object</code> | A query object that will limit what resources are retrieved when converted into request params. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
get(
  "orgs/MSFOCG/collections/lime-demo/HEAD/mappings",
  {
    page: 1,
    exact_match: "off",
    limit: 200,
    verbose: false,
    sortDesc: "_score",
  },
  (state) => {
    // Add state oclMappings
    const oclMappings = state.data;
    return { ...state, data: {}, references: [], response: {}, oclMappings };
  }
);
```

* * *

## getMappings

getMappings(ownerId, repositoryId, [options], callback) ⇒ <code>Operation</code>
Get a source repository in OCL

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| ownerId | <code>string</code> | An OCL user or organization |
| repositoryId | <code>string</code> | An OCL collection id or source id |
| [options] | <code>Object</code> | Optional. `options`  which can be passed to  See more [on OCL swagger docs](https://api.openconceptlab.org/swagger/) |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
getMappings(
  "MSFOCG",
  "lime-demo",
  { page: 1, exact_match: "off", verbose: false },
  (state) => {
    // Add state oclMappings
    const oclMappings = state.data;
    return { ...state, data: {}, references: [], response: {}, oclMappings };
  }
);
```

* * *


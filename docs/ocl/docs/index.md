<dl>
<dt>
    <a href="#get">get(path, query, callback)</a></dt>
<dt>
    <a href="#getmappings">getMappings(ownerId, repositoryId, [options], callback)</a></dt>
</dl>


This adaptor exports the following from common:
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### get

<p><code>get(path, query, callback) ⇒ Operation</code></p>

Get a resource in OCL


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

### getMappings

<p><code>getMappings(ownerId, repositoryId, [options], callback) ⇒ Operation</code></p>

Get a source repository in OCL


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


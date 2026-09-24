<dl>
<dt>
    <a href="#langfuseapiclient">LangfuseApiClient(func)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#cursor">cursor()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
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
    <a href="/adaptors/packages/common-docs#group">group()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#map">map()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#scrubemojis">scrubEmojis()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>

## Functions
### LangfuseApiClient

<p><code>LangfuseApiClient(func) ⇒ Operation</code></p>

Access the langfuse client API. Accepts a callback which receives state and the client API object. See the full API reference at [https://js.reference.langfuse.com/](https://js.reference.langfuse.com/).


| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Callback `(state, api) => state` receiving the [LangfuseApiClient](#LangfuseApiClient) as `api` |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the parsed response from the Langfuse API |
| references | an array of all previous data objects used in the Job |

**Example:** Fetch recent observations
```js
langfuse(async (state, api) => {
  const { data } = await api.observations.getMany({ limit: 10 });
  return { ...state, data };
});
```
**Example:** List score configs
```js
langfuse(async (state, api) => {
  const { data: configs } = await api.scoreConfigs.get({ limit: 100 });
  return { ...state, data: configs };
});
```
**Example:** Query aggregate metrics
```js
langfuse(async (state, api) => {
  const query = {
    view: 'observations',
    metrics: [{ measure: 'totalCost', aggregation: 'sum' }],
    fromTimestamp: '2025-01-01T00:00:00Z',
    toTimestamp: '2025-06-01T00:00:00Z',
  };
  const { data } = await api.metrics.metrics({ query: JSON.stringify(query) });
  return { ...state, data };
});
```

* * *


##  Interfaces

### LangfuseState

State object


**Properties**

| Name | Description |
| --- | --- |
| data | the parsed response from the Langfuse API |
| references | an array of all previous data objects used in the Job |


* * *


<dl>
<dt>
    <a href="#deepresearch">deepResearch(message, options)</a></dt>
<dt>
    <a href="#prompt">prompt(message, options)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### deepResearch

<p><code>deepResearch(message, options) ⇒ operation</code></p>

Prompt GPT deep research interface


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The prompt |
| options | [<code>DeepResearchOptions</code>](#deepresearchoptions) | Model, tools and other parameters (https://platform.openai.com/docs/guides/deep-research) |


**Example**
```js
deepResearch(
  `Evaluate if the following company qualifies as a sustainable fashion brand:

  INPUT: ${JSON.stringify($.data)}
  Return JSON only with:
  - sustainabilityStatus: "Certified", "Likely", or "Unverified"
  - materialsUsed
  - certifications
  - confidenceLevel (0–5)
  - researchNotes`,
  {
    model: 'o3-deep-research',
    max_tool_calls: 1
  }
)
```

* * *

### prompt

<p><code>prompt(message, options) ⇒ operation</code></p>

Prompt the GPT chat interface to respond


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The prompt |
| options | [<code>PromptOptions</code>](#promptoptions) | Model, Reasoning Effort, Response Form and other parameters (https://platform.openai.com/docs/api-reference/chat/create) |


**Example**
```js
prompt(`Filter these emails and pick out the most urgent: ${JSON.stringify($.data)}`);
```

* * *


##  Interfaces

### DeepResearchOptions

Options provided to Chat Responses Create (https://platform.openai.com/docs/guides/deep-research)


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | Which mode to use, i.e., `o3-deep-research`. |
| tools | <code>string</code> | An array of tools to use for the search. Default [{"type": "web_search_preview"}] See (https://platform.openai.com/docs/guides/deep-research#tools) |


* * *

### PromptOptions

Options provided to Chat Completions Create (https://platform.openai.com/docs/api-reference/chat/create)


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | Which mode to use, i.e., `o3-mini-2025-01-31`. |


* * *


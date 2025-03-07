<dl>
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
### prompt

<p><code>prompt(message, options) ⇒ operation</code></p>

Prompt the GPT chat interface to respond


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The prompt |
| options | [<code>PromptOptions</code>](#promptoptions) | Model, Reasoning Effort, Response Form and other parameters (https://platform.openai.com/docs/api-reference/chat/create) |

**Example**
```js
prompt('Write a haiku about surfing.');
```

* * *


##  Interfaces

### PromptOptions

Options provided to Chat Completions Create (https://platform.openai.com/docs/api-reference/chat/create)

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | Which mode to use, i.e., `o3-mini-2025-01-31`. |
| reasoning_effort | <code>string</code> | Use `low`, `medium`, or `high` to constrain effort on reasoning for some models. |


* * *


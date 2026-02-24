<dl>
<dt>
    <a href="#prompt">prompt(message, opts)</a></dt>
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

<p><code>prompt(message, opts) ⇒ operation</code></p>

Prompt the Claude chat interface to respond


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The prompt |
| opts | [<code>PromptOptions</code>](#promptoptions) | Model, Max Tokens, Temperature, and other options. |


**Example**
```js
prompt(`Filter these emails and pick out the most urgent: ${JSON.stringify($.data)}`);
```

* * *


##  Interfaces

### PromptOptions

Options provided to Chat Completions Create (https://docs.anthropic.com/en/api/messages)


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | Which mode to use, i.e., `claude-sonnet-4-6`. |
| max_tokens | <code>string</code> | The maximum number of tokens to generate before stopping, i.e., `1024` |
| temperature | <code>number</code> | Amount of randomness injected into the response. Ranges from 0.0 to 1.0. Use temperature closer to 0.0 for analytical / multiple choice, and closer to 1.0 for creative and generative tasks. |


* * *


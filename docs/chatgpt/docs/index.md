<dl>
<dt>
    <a href="#prompt">prompt(message, options)</a></dt>
</dl>


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
prompt(`Filter these emails and pick out the most urgent: ${JSON.stringify($.data)}`);
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


<dl>
<dt>
    <a href="#deepresearch">deepResearch(message, options)</a></dt>
<dt>
    <a href="#generateimage">generateImage(promptText, options)</a></dt>
<dt>
    <a href="#prompt">prompt(message, options)</a></dt>
</dl>


## Functions
### deepResearch

<p><code>deepResearch(message, options) ⇒ operation</code></p>

Prompt Gemini deep research (using Google Search grounding)


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The research query |
| options | [<code>DeepResearchOptions</code>](#deepresearchoptions) | Model and tools |


**Example**
```js
deepResearch(`Find recent news about OpenFn`);
```

* * *

### generateImage

<p><code>generateImage(promptText, options) ⇒ operation</code></p>

Generate an image using Gemini/Imagen


| Param | Type | Description |
| --- | --- | --- |
| promptText | <code>string</code> | The image prompt |
| options | <code>object</code> | Model and generation options |


**Example**
```js
generateImage("A futuristic city skyline");
```

* * *

### prompt

<p><code>prompt(message, options) ⇒ operation</code></p>

Prompt the Gemini interface to respond


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The prompt |
| options | [<code>PromptOptions</code>](#promptoptions) | Model and other parameters |


**Example**
```js
prompt(`Summarize this text: ${JSON.stringify($.data)}`);
```

* * *


##  Interfaces

### DeepResearchOptions

Options provided to the Deep Research function


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | Which model to use, defaults to 'gemini-2.5-flash-lite' |
| tools | <code>object</code> | Tools configuration (e.g., googleSearch) shortcut to add tools in generationConfig use any of the following tools: https://ai.google.dev/gemini-api/docs/tools |
| generationConfig | <code>object</code> | Configuration for generation (temperature, topK, etc.) see the options here: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/content-generation-parameters#googlegenaisdk_textgen_config_with_txt-nodejs_genai_sdk |


* * *

### GenerateImageOptions

Options provided to the Generate Image function


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | Which model to use, defaults to ' 'gemini-3-pro-image-preview' |
| imageSize | <code>string</code> | Size of the image to generate, defaults to '1k' |
| aspectRatio | <code>string</code> | Aspect ratio of the image to generate, defaults to '1:1' |
| generationConfig | <code>object</code> | Configuration for generation (temperature, topK, etc.) see the options here: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/content-generation-parameters#googlegenaisdk_textgen_config_with_txt-nodejs_genai_sdk |


* * *

### PromptOptions

Options provided to the Prompt function


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | Which model to use, defaults to 'gemini-2.5-flash-lite' |
| generationConfig | <code>object</code> | Configuration for generation (temperature, topK, etc.) see the options here: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/content-generation-parameters#googlegenaisdk_textgen_config_with_txt-nodejs_genai_sdk |


* * *


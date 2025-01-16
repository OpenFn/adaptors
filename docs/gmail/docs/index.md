<dl>
<dt>
    <a href="#getcontentsfrommessages">getContentsFromMessages(userId, userOptions)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
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
    <a href="/adaptors/packages/common-docs#http">http</a>
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
### getContentsFromMessages

<p><code>getContentsFromMessages(userId, userOptions) ⇒ function</code></p>

Requests contents from messages of a Gmail account.

**Returns**: <code>function</code> - A function that processes the state.  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The email address of the account to retrieve messages from. |
| userOptions | [<code>Options</code>](#options) | Customized options including desired contents and query. |

**Example**
```js
getContentsFromMessages(
  'test@tester.com',
  {
    query: 'in:inbox subject:my+test+message',
    desiredContents: ['date', 'from', 'subject', { type: 'body', maxLength: 50 }]
  }
)
```

* * *


##  Interfaces

### DesiredContent

Used to isolate the type of content to retrieve from the message.

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | Message content type. Valid types: from, date, subject, body, archive, file. |
| [name] | <code>string</code> | <code>null</code> | A custom description for the content type. Optional. |
| [archive] | <code>RegExp</code> \| <code>string</code> |  | Identifier to isolate the desired attachment when type is 'archive'.   Use a regular expression for pattern matching or a string for a literal match. Required if type is 'archive'. |
| [file] | <code>RegExp</code> \| <code>string</code> |  | Identifier to isolate the desired attachment when type is 'file' or 'archive'.   Use a regular expression for pattern matching or a string for a literal match. Required if type is 'file' or 'archive'. |
| [maxLength] | <code>number</code> | <code></code> | Maximum number of characters to retrieve from the content. Optional. |


* * *

### Options

Configurable options provided to the Gmail adaptor.

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>string</code> |  | The email address of the Gmail account. |
| [query] | <code>string</code> | <code>null</code> | Custom query to limit the messages result. Adheres to the Gmail search syntax. Optional. |
| [desiredContents] | <code>Array.&lt;(string\|DesiredContent)&gt;</code> | <code>[&#x27;from&#x27;, &#x27;date&#x27;, &#x27;subject&#x27;, &#x27;body&#x27;]</code> | An array of strings or DesiredContent objects used to specify which parts of the message to retrieve. Optional, default is `['from', 'date', 'subject', 'body']`. |
| [processedIds] | <code>Array.&lt;string&gt;</code> | <code></code> | Ignore message ids which have already been processed. Optional. |


* * *


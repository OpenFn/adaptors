<dl>
<dt>
    <a href="#getcontentsfrommessages">getContentsFromMessages(options)</a></dt>
<dt>
    <a href="#sendmessage">sendMessage(message)</a></dt>
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

<p><code>getContentsFromMessages(options) ⇒ Operation</code></p>

Downloads contents from messages of a Gmail account.


| Param | Type | Description |
| --- | --- | --- |
| options | [<code>Options</code>](#options) | Customized options including desired contents and query. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The returned message objects, of the form `{ messageId, contents } ` |
| processedIds | An array of string ids processed by this request |

**Example:** Get a message with a specific subject
```js
getContentsFromMessages(
  {
    query: 'subject:my+test+message'
  }
)
```
**Example:** Get messages after a specific date, with subject and report.txt attachment
```js
getContentsFromMessages(
  {
    query: 'after:15/01/2025',
    contents: [
      'subject',
      { type: 'file', name: 'metadata', file: 'report.txt'}
    ]
  }
)
```

* * *

### sendMessage

<p><code>sendMessage(message) ⇒ Operation</code></p>

Sends a Gmail message using the provided configuration.
Supports attachments and standard email fields like subject, body, and recipients.


| Param | Type | Description |
| --- | --- | --- |
| message | [<code>SendMessageOptions</code>](#sendmessageoptions) \| [<code>Array.&lt;SendMessageOptions&gt;</code>](#sendmessageoptions) | The message configuration object or array of objects. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The Gmail API response from sending the message. |

**Example**
```js
sendMessage({
  to: 'recipient@example.org',
  subject: 'Test Message',
  body: 'Hello from OpenFn!',
  attachments: [
    { filename: 'test.txt', content: 'Some text content' }
  ]
})
```

* * *


##  Interfaces

### MessageContent

Used to isolate the type of content to retrieve from the message.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [type] | <code>string</code> | Message content type. Valid types: from, date, subject, body, archive, file. |
| [name] | <code>string</code> | A custom description for the content type. |
| [archive] | <code>RegExp</code> \| <code>string</code> | Identifier to isolate the desired attachment when type is 'archive'.   Use a regular expression for pattern matching or a string for a literal match. Required if type is 'archive'. |
| [file] | <code>RegExp</code> \| <code>string</code> | Identifier to isolate the desired attachment when type is 'file' or 'archive'.   Use a regular expression for pattern matching or a string for a literal match. Required if type is 'file' or 'archive'. |
| [maxLength] | <code>number</code> | Maximum number of characters to retrieve from the content. |


* * *

### Options

Configurable options provided to the Gmail adaptor.


**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [query] | <code>string</code> |  | Gmail search query string. |
| [contents] | <code>Array.&lt;(string\|MessageContent)&gt;</code> | <code>[&#x27;from&#x27;, &#x27;date&#x27;, &#x27;subject&#x27;, &#x27;body&#x27;]</code> | An array of strings or MessageContent objects used to specify which parts of the message to retrieve. |
| [processedIds] | <code>Array.&lt;string&gt;</code> |  | Ignore message ids which have already been processed. |
| [email] | <code>string</code> |  | The user account to retrieve messages from. Defaults to the authenticated user. |
| [maxResults] | <code>int</code> |  | Maximum number of messages to process per request. Default is 1000. |


* * *

### SendMessageOptions

Configurable fields for composing an outbound Gmail message.


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | Recipient email address. |
| subject | <code>string</code> | Subject line of the email. |
| body | <code>string</code> | Email body content. |
| [attachments] | <code>Array.&lt;{filename: string, content: (string\|Buffer)}&gt;</code> | Optional list of files to attach. |


* * *


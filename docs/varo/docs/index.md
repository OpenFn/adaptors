

## Functions
### convertToEms

<p><code>convertToEms(messageContents) ⇒ Operation</code></p>

Processes EMS data from the provided list of message contents.


| Param | Type | Description |
| --- | --- | --- |
| messageContents | <code>Array</code> | Array of message content objects. |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The converted, EMS-compliant version of each message contents. |
**Example:** Convert data to EMS-compliant data.
```js
convertToEms(
  [
    {
      metadata: { content: '', filename: '' },
      data: { content: '', filename: '' }
    }
  ]
);
```

* * *



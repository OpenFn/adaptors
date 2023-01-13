## Functions

<dl>
<dt><a href="#execute">execute(operations)</a> ⇒ <code>Operation</code></dt>
<dd><p>Execute a sequence of operations.
Wraps <code>language-common/execute</code>, and prepends initial state for http.</p>
</dd>
<dt><a href="#appendValues">appendValues(params)</a> ⇒ <code>Operation</code></dt>
<dd><p>Add an array of rows to the spreadsheet.
<a href="https://developers.google.com/sheets/api/samples/writing#append_values">https://developers.google.com/sheets/api/samples/writing#append_values</a></p>
</dd>
</dl>

<a name="execute"></a>

## execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| operations | <code>Operations</code> | Operations to be performed. |

**Example**  
```js
execute(
  create('foo'),
  delete('bar')
)(state)
```
<a name="appendValues"></a>

## appendValues(params) ⇒ <code>Operation</code>
Add an array of rows to the spreadsheet.
https://developers.google.com/sheets/api/samples/writing#append_values

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Data object to add to the spreadsheet. |

**Example**  
```js
appendValues({
  spreadsheetId: '1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos',
  range: 'Sheet1!A1:E1',
  values: [
    ['From expression', '$15', '2', '3/15/2016'],
    ['Really now!', '$100', '1', '3/20/2016'],
  ],
})
```

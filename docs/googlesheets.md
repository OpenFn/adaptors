<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute](#module_Adaptor.execute)
        * [new exports.execute(operations)](#new_module_Adaptor.execute_new)
    * [.appendValues](#module_Adaptor.appendValues)
        * [new exports.appendValues(params)](#new_module_Adaptor.appendValues_new)

<a name="module_Adaptor.execute"></a>

### Adaptor.execute
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
<a name="new_module_Adaptor.execute_new"></a>

#### new exports.execute(operations)
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.


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
<a name="module_Adaptor.appendValues"></a>

### Adaptor.appendValues
**Kind**: static class of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  
<a name="new_module_Adaptor.appendValues_new"></a>

#### new exports.appendValues(params)
Add an array of rows to the spreadsheet.
https://developers.google.com/sheets/api/samples/writing#append_values


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

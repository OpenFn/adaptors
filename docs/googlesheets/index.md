## appendValues

appendValues(params) ⇒ <code>Operation</code>
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

* * *

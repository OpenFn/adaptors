<dl>
<dt>
    <a href="#convertitemstoreports">convertItemsToReports(items, [reportType])</a></dt>
<dt>
    <a href="#convertreportstomessagecontents">convertReportsToMessageContents(reports, [reportType])</a></dt>
<dt>
    <a href="#converttoems">convertToEms(messageContents)</a></dt>
<dt>
    <a href="#iskeyinrange">isKeyInRange(key, start, end)</a></dt>
<dt>
    <a href="#parseutcfordatarange">parseUtcForDataRange(timeZone, startIso, endIso)</a></dt>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## Functions
### convertItemsToReports

<p><code>convertItemsToReports(items, [reportType]) ⇒ Operation</code></p>

Read a collection of EMS-like data records and convert them to a standard EMS report/record format.
Systematically separates report properties from record properties.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| items | <code>Array</code> |  | Array of EMS-like JSON objects. |
| [reportType] | <code>string</code> | <code>&quot;&#x27;unknown&#x27;&quot;</code> | Optional. Source of the report, e.g., "ems" or "rtmd". |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | The converted, EMS-compliant report with records. |

**Example:** Convert data to EMS-compliant data.
```js
convertItemsToReport(
  [
    { "ASER": "BJBC 08 30", "ABST": "20241205T004440Z", "TVC": 5.0 },
    { "ASER": "BJBC 08 30", "ABST": "20241205T005440Z", "TVC": 5.2 },
  ]
);

state.data becomes:
{
  "ASER": "BJBC 08 30",
  records: [
    { "ABST": "20241205T004440Z", "TVC": 5.0 },
    { "ABST": "20241205T005440Z", "TVC": 5.2 },
  ],
}
```

* * *

### convertReportsToMessageContents

<p><code>convertReportsToMessageContents(reports, [reportType]) ⇒ function</code></p>

Converts an EMS-compliant report into Varo-compatible message components.

**Returns**: <code>function</code> - An operation function that receives `state` and returns updated message content.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| reports | <code>Object</code> |  | EMS-compliant report objects. |
| [reportType] | <code>string</code> | <code>&quot;&#x27;unknown&#x27;&quot;</code> | Optional. Source of the report, e.g., "ems" or "rtmd". |


**Example**
```js
// Convert EMS-compliant reports to Varo message components.
convertReportsToMessageContents(emsReports, "ems");
```

* * *

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

### isKeyInRange

<p><code>isKeyInRange(key, start, end) ⇒ boolean</code></p>

Checks whether the timestamp embedded in a key falls within a UTC datetime range.

**Returns**: <code>boolean</code> - True if the parsed UTC timestamp is within the range, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | A string key containing a UTC timestamp in the format `YYYYMMDDTHHMMSS`, following a colon (e.g. "prefix:20250624T101530"). |
| start | <code>Date</code> | The inclusive lower bound of the UTC datetime range. |
| end | <code>Date</code> | The exclusive upper bound of the UTC datetime range. |



* * *

### parseUtcForDataRange

<p><code>parseUtcForDataRange(timeZone, startIso, endIso) ⇒ UtcRange</code></p>

Computes the UTC datetime range that corresponds to a given IANA timezone.


| Param | Type | Description |
| --- | --- | --- |
| timeZone | <code>string</code> | An IANA time zone identifier (e.g. "America/Los_Angeles"). |
| startIso | <code>string</code> | Starting date in ISO format. |
| endIso | <code>string</code> | Ending date range in ISO format. |



* * *


##  Interfaces

### UtcRange

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wallClock | <code>Date</code> | The current local datetime as it appears on the wall in the specified timezone. |
| startUtc | <code>Date</code> | UTC start date range (inclusive). |
| endUtc | <code>Date</code> | UTC end of date range (exclusive). |
| collectionKeys | <code>Array</code> | Array of wildcard patterns to match UTC dates which correspond with date range (e.g. "*20250624*"). |


* * *


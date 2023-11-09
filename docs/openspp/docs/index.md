## Functions

<dl>
<dt>
    <a href="#enroll">enroll(registrant_id, program_id, callback)</a></dt>
<dt>
    <a href="#getEnrolledPrograms">getEnrolledPrograms(registrant_id, callback)</a></dt>
<dt>
    <a href="#getGroup">getGroup(registrant_id, callback)</a></dt>
<dt>
    <a href="#getGroupMembers">getGroupMembers(registrant_id, [offset], callback)</a></dt>
<dt>
    <a href="#getIndividual">getIndividual(registrant_id, callback)</a></dt>
<dt>
    <a href="#getProgram">getProgram(program_id, callback)</a></dt>
<dt>
    <a href="#getPrograms">getPrograms([offset], callback)</a></dt>
<dt>
    <a href="#getServicePoint">getServicePoint(name, [offset], callback)</a></dt>
<dt>
    <a href="#searchGroup">searchGroup(domain, [offset], callback)</a></dt>
<dt>
    <a href="#searchIndividual">searchIndividual(domain, [offset], callback)</a></dt>
<dt>
    <a href="#unenroll">unenroll(registrant_id, program_id, callback)</a></dt>
</dl>

## enroll

enroll(registrant_id, program_id, callback)
enroll registrant to program from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| registrant_id | <code>string</code> | registrant_id of group / individual wanted to enroll |
| program_id | <code>string</code> | program_id of program |
| callback | <code>function</code> | An optional callback function |

**Example**  
```js
enroll("IND_Q4VGGZPF", "PROG_2023_00000001")
```

* * *

## getEnrolledPrograms

getEnrolledPrograms(registrant_id, callback) ⇒ <code>Operation</code>
get programs list from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| registrant_id | <code>string</code> | registrant_id of group / individual wanted to search |
| callback | <code>function</code> | An optional callback function |

**Example**  
```js
getEnrolledPrograms("IND_Q4VGGZPF")
```

* * *

## getGroup

getGroup(registrant_id, callback) ⇒ <code>Operation</code>
get group information from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| registrant_id | <code>string</code> | The registrant_id of the group |
| callback | <code>function</code> | An optional callback function |

**Example**  
```js
getGroup("GRP_Q4VGGZPF")
```

* * *

## getGroupMembers

getGroupMembers(registrant_id, [offset], callback) ⇒ <code>Operation</code>
get group members information from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| registrant_id | <code>string</code> |  | The name of the group |
| [offset] | <code>number</code> | <code>0</code> | Offset searching |
| callback | <code>function</code> |  | An optional callback function |

**Example**  
```js
getGroupMembers("GRP_Q4VGGZPF")
```

* * *

## getIndividual

getIndividual(registrant_id, callback) ⇒ <code>Operation</code>
get individual information from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| registrant_id | <code>string</code> | The registrant_id of the individual |
| callback | <code>function</code> | An optional callback function |

**Example**  
```js
getIndividual("IND_Q4VGGZPF")
```

* * *

## getProgram

getProgram(program_id, callback) ⇒ <code>Operation</code>
get program information from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| program_id | <code>string</code> | searching domain |
| callback | <code>function</code> | An optional callback function |

**Example**  
```js
getProgram("PROG_2023_00000001")
```

* * *

## getPrograms

getPrograms([offset], callback) ⇒ <code>Operation</code>
get programs list from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offset] | <code>number</code> | <code>0</code> | offset from start |
| callback | <code>function</code> |  | An optional callback function |

**Example**  
```js
getPrograms(100)
```

* * *

## getServicePoint

getServicePoint(name, [offset], callback) ⇒ <code>Operation</code>
get service points information from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The number of the agent |
| [offset] | <code>number</code> | <code>0</code> | Offset searching |
| callback | <code>function</code> |  | An optional callback function |

**Example**  
```js
getServicePoint("000117")
```

* * *

## searchGroup

searchGroup(domain, [offset], callback) ⇒ <code>Operation</code>
get groups from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| domain | <code>string</code> |  | searching domain |
| [offset] | <code>number</code> | <code>0</code> | Offset searching |
| callback | <code>function</code> |  | An optional callback function |

**Example**  
```js
searchGroup([["registrant_id", "=", "GRP_Q4VGGZPF"]])
```

* * *

## searchIndividual

searchIndividual(domain, [offset], callback) ⇒ <code>Operation</code>
get individuals from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| domain | <code>string</code> |  | searching domain |
| [offset] | <code>number</code> | <code>0</code> | Offset searching |
| callback | <code>function</code> |  | An optional callback function |

**Example**  
```js
searchIndividual([["registrant_id", "=", "IND_Q4VGGZPF"]])
```

* * *

## unenroll

unenroll(registrant_id, program_id, callback)
unenroll registrant from program from OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| registrant_id | <code>string</code> | registrant_id of group / individual wanted to unenroll |
| program_id | <code>string</code> | program_id of program |
| callback | <code>function</code> | An optional callback function |

**Example**  
```js
unenroll("IND_Q4VGGZPF", "PROG_2023_00000001")
```

* * *


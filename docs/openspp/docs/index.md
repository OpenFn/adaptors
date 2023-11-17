## Functions

<dl>
<dt>
    <a href="#addToGroup">addToGroup(group_id, individual_id, role)</a></dt>
<dt>
    <a href="#createGroup">createGroup(data, callback)</a></dt>
<dt>
    <a href="#createIndividual">createIndividual(data, callback)</a></dt>
<dt>
    <a href="#enroll">enroll(registrant_id, program_id)</a></dt>
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
    <a href="#removeFromGroup">removeFromGroup(group_id, individual_id)</a></dt>
<dt>
    <a href="#searchGroup">searchGroup(domain, [offset], callback)</a></dt>
<dt>
    <a href="#searchIndividual">searchIndividual(domain, [offset], callback)</a></dt>
<dt>
    <a href="#unenroll">unenroll(registrant_id, program_id)</a></dt>
<dt>
    <a href="#updateGroup">updateGroup(group_id, data)</a></dt>
<dt>
    <a href="#updateIndividual">updateIndividual(individual_id, data)</a></dt>
</dl>

## addToGroup

addToGroup(group_id, individual_id, role) ⇒ <code>Operation</code>
add individual to group in OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| group_id | <code>string</code> | group registrant id |
| individual_id | <code>string</code> | individual registrant id |
| role | <code>string</code> | individual role in group |

**Example**  
```js
addToGroup("GRP_B2BRHJN2", "IND_8DUQL4M4", "Head")
```

* * *

## createGroup

createGroup(data, callback) ⇒ <code>Operation</code>
create new group for OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | registrant create data |
| callback | <code>function</code> | An optional callback function |

**Example**  
```js
createGroup({ name: "Group 1" })
```

* * *

## createIndividual

createIndividual(data, callback) ⇒ <code>Operation</code>
create new individual for OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | registrant create data |
| callback | <code>function</code> | An optional callback function |

**Example**  
```js
createIndividual({ name: "Individual 1" })
```

* * *

## enroll

enroll(registrant_id, program_id)
enroll registrant to program in OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| registrant_id | <code>string</code> | registrant_id of group / individual wanted to enroll |
| program_id | <code>string</code> | program_id of program |

**Example**  
```js
enroll("IND_Q4VGGZPF", "PROG_2023_00000001")
```

* * *

## getEnrolledPrograms

getEnrolledPrograms(registrant_id, callback) ⇒ <code>Operation</code>
get programs list for specific registrant from OpenSPP

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

## removeFromGroup

removeFromGroup(group_id, individual_id) ⇒ <code>Operation</code>
remove individual from group in OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| group_id | <code>string</code> | group registrant id |
| individual_id | <code>string</code> | individual registrant id |

**Example**  
```js
removeFromGroup("GRP_B2BRHJN2", "IND_8DUQL4M4")
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

unenroll(registrant_id, program_id)
unenroll registrant from program in OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| registrant_id | <code>string</code> | registrant_id of group / individual wanted to unenroll |
| program_id | <code>string</code> | program_id of program |

**Example**  
```js
unenroll("IND_Q4VGGZPF", "PROG_2023_00000001")
```

* * *

## updateGroup

updateGroup(group_id, data) ⇒ <code>Operation</code>
update group for OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| group_id | <code>string</code> | group registrant id |
| data | <code>object</code> | registrant update data |

**Example**  
```js
updateGroup("GRP_B2BRHJN2", { name: "Group 1" })
```

* * *

## updateIndividual

updateIndividual(individual_id, data) ⇒ <code>Operation</code>
update individual for OpenSPP

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| individual_id | <code>string</code> | individual registrant id |
| data | <code>object</code> | registrant update data |

**Example**  
```js
updateIndividual("IND_8DUQL4M4", { name: "Individual 1" })
```

* * *


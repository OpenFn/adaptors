<dl>
<dt>
    <a href="#addtogroup">addToGroup(group_id, individual_id, role)</a></dt>
<dt>
    <a href="#creategroup">createGroup(data, callback)</a></dt>
<dt>
    <a href="#createindividual">createIndividual(data, callback)</a></dt>
<dt>
    <a href="#enroll">enroll(spp_id, program_id)</a></dt>
<dt>
    <a href="#getarea">getArea(spp_id, callback)</a></dt>
<dt>
    <a href="#getenrolledprograms">getEnrolledPrograms(spp_id, callback)</a></dt>
<dt>
    <a href="#getgroup">getGroup(spp_id, callback)</a></dt>
<dt>
    <a href="#getgroupmembers">getGroupMembers(spp_id, [options], callback)</a></dt>
<dt>
    <a href="#getindividual">getIndividual(spp_id, callback)</a></dt>
<dt>
    <a href="#getprogram">getProgram(program_id, callback)</a></dt>
<dt>
    <a href="#getprograms">getPrograms([options], callback)</a></dt>
<dt>
    <a href="#getservicepoint">getServicePoint(spp_id, callback)</a></dt>
<dt>
    <a href="#removefromgroup">removeFromGroup(group_id, individual_id)</a></dt>
<dt>
    <a href="#searcharea">searchArea(domain, [options], callback)</a></dt>
<dt>
    <a href="#searchgroup">searchGroup(domain, [options], callback)</a></dt>
<dt>
    <a href="#searchindividual">searchIndividual(domain, [options], callback)</a></dt>
<dt>
    <a href="#searchservicepoint">searchServicePoint(domain, [options], callback)</a></dt>
<dt>
    <a href="#unenroll">unenroll(spp_id, program_id)</a></dt>
<dt>
    <a href="#updategroup">updateGroup(group_id, data)</a></dt>
<dt>
    <a href="#updateindividual">updateIndividual(individual_id, data)</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns()</a>
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
    <a href="/adaptors/packages/common-docs#http">http()</a>
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
### addToGroup

<p><code>addToGroup(group_id, individual_id, role) ⇒ Operation</code></p>

add individual to group in OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| group_id | <code>string</code> | group registrant id |
| individual_id | <code>string</code> | individual registrant id |
| role | <code>string</code> | individual role in group |

**Example:** create a new head for group
```js
addToGroup("GRP_B2BRHJN2", "IND_8DUQL4M4", "Head")
```
**Example:** create a new ordinary member for group
```js
addToGroup("GRP_B2BRHJN2", "IND_8DUQL4M4")
```
**Example:** create a new member with new role for group
```js
addToGroup("GRP_B2BRHJN2", "IND_8DUQL4M4", "new-role-name")
```

* * *

### createGroup

<p><code>createGroup(data, callback) ⇒ Operation</code></p>

create new group for OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | registrant create data |
| callback | <code>function</code> | An optional callback function |

**Example**
```js
createGroup({ name: "Group 1" })
```

* * *

### createIndividual

<p><code>createIndividual(data, callback) ⇒ Operation</code></p>

create new individual for OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | registrant create data |
| callback | <code>function</code> | An optional callback function |

**Example**
```js
createIndividual({ name: "Individual 1" })
```

* * *

### enroll

<p><code>enroll(spp_id, program_id)</code></p>

enroll registrant to program in OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| spp_id | <code>string</code> | spp_id of group / individual wanted to enroll |
| program_id | <code>string</code> | program_id of program |

**Example**
```js
enroll("IND_Q4VGGZPF", "PROG_2023_00000001")
```

* * *

### getArea

<p><code>getArea(spp_id, callback) ⇒ Operation</code></p>

get area by id in OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| spp_id | <code>string</code> | spp_id of area |
| callback | <code>function</code> | An optional callback function |

**Example**
```js
getArea("LOC_7M92NLDH")
```

* * *

### getEnrolledPrograms

<p><code>getEnrolledPrograms(spp_id, callback) ⇒ Operation</code></p>

get programs list for specific registrant from OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| spp_id | <code>string</code> | spp_id of group / individual wanted to search |
| callback | <code>function</code> | An optional callback function |

**Example**
```js
getEnrolledPrograms("IND_Q4VGGZPF")
```

* * *

### getGroup

<p><code>getGroup(spp_id, callback) ⇒ Operation</code></p>

get group information from OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| spp_id | <code>string</code> | The spp_id of the group |
| callback | <code>function</code> | An optional callback function |

**Example**
```js
getGroup("GRP_Q4VGGZPF")
```

* * *

### getGroupMembers

<p><code>getGroupMembers(spp_id, [options], callback) ⇒ Operation</code></p>

get group members information from OpenSPP


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| spp_id | <code>string</code> |  | The name of the group |
| [options] | <code>object</code> | <code>{}</code> | Searching options, eg: limit for limiting number of records returning, order for searching order, offset for skipping records |
| callback | <code>function</code> |  | An optional callback function |

**Example**
```js
getGroupMembers("GRP_Q4VGGZPF")
```

* * *

### getIndividual

<p><code>getIndividual(spp_id, callback) ⇒ Operation</code></p>

get individual information from OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| spp_id | <code>string</code> | The spp_id of the individual |
| callback | <code>function</code> | An optional callback function |

**Example**
```js
getIndividual("IND_Q4VGGZPF")
```

* * *

### getProgram

<p><code>getProgram(program_id, callback) ⇒ Operation</code></p>

get program information from OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| program_id | <code>string</code> | searching domain |
| callback | <code>function</code> | An optional callback function |

**Example**
```js
getProgram("PROG_2023_00000001")
```

* * *

### getPrograms

<p><code>getPrograms([options], callback) ⇒ Operation</code></p>

get programs list from OpenSPP


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>number</code> | <code>{}</code> | offset from start |
| callback | <code>function</code> |  | An optional callback function |

**Example**
```js
getPrograms(100)
```

* * *

### getServicePoint

<p><code>getServicePoint(spp_id, callback) ⇒ Operation</code></p>

get service points information from OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| spp_id | <code>string</code> | The spp_id of the agent |
| callback | <code>function</code> | An optional callback function |

**Example**
```js
getServicePoint("SVP_8P4KP4RT")
```

* * *

### removeFromGroup

<p><code>removeFromGroup(group_id, individual_id) ⇒ Operation</code></p>

remove individual from group in OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| group_id | <code>string</code> | group registrant id |
| individual_id | <code>string</code> | individual registrant id |

**Example**
```js
removeFromGroup("GRP_B2BRHJN2", "IND_8DUQL4M4")
```

* * *

### searchArea

<p><code>searchArea(domain, [options], callback) ⇒ Operation</code></p>

searching for service point in OpenSPP


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| domain | <code>Array</code> |  | searching domain |
| [options] | <code>object</code> | <code>{}</code> | Searching options, eg: limit for limiting number of records returning, order for searching order, offset for skipping records |
| callback | <code>function</code> |  | An optional callback function |

**Example:** search without offset
```js
searchArea([["code", "=", "10732"]])
```
**Example:** search with offset
```js
searchArea([["kind", "=", 1]], { offset: 10 }})
```

* * *

### searchGroup

<p><code>searchGroup(domain, [options], callback) ⇒ Operation</code></p>

get groups from OpenSPP


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| domain | <code>Array</code> |  | searching domain |
| [options] | <code>object</code> | <code>{}</code> | Searching options, eg: limit for limiting number of records returning, order for ordering search, offset for skipping records |
| callback | <code>function</code> |  | An optional callback function |

**Example:** search group by domain
```js
searchGroup([["spp_id", "=", "GRP_Q4VGGZPF"]])
```
**Example:** search group by domain with offset
```js
searchGroup([["spp_id", "ilike", "GRP"]], { offset: 100 }})
```
**Example:** search group by complex domain for more accuracy
```js
searchGroup([["address", "!=", false], ["phone", "!=", false]])
```

* * *

### searchIndividual

<p><code>searchIndividual(domain, [options], callback) ⇒ Operation</code></p>

get individuals from OpenSPP


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| domain | <code>Array</code> |  | searching domain |
| [options] | <code>object</code> | <code>{}</code> | Searching options, eg: limit for limiting number of records returning, order for searching order, offset for skipping records |
| callback | <code>function</code> |  | An optional callback function |

**Example:** search individual by domain
```js
searchIndividual([["spp_id", "=", "IND_Q4VGGZPF"]])
```
**Example:** search individual by domain with offset
```js
searchIndividual([["spp_id", "ilike", "IND"]], { offset: 100 })
```
**Example:** search individual by complex domain for more accuracy
```js
searchIndividual([["address", "!=", false], ["birthdate", "=", false]])
```

* * *

### searchServicePoint

<p><code>searchServicePoint(domain, [options], callback) ⇒ Operation</code></p>

searching for service point in OpenSPP


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| domain | <code>Array</code> |  | searching domain |
| [options] | <code>object</code> | <code>{}</code> | Searching options, eg: limit for limiting number of records returning, order for searching order, offset for skipping records |
| callback | <code>function</code> |  | An optional callback function |

**Example:** search without offset
```js
searchServicePoint([["name", "ilike", "agent 1"]])
```
**Example:** search with offset
```js
searchServicePoint([["name", "ilike", "agent 1"]], { offset: 100 })
```

* * *

### unenroll

<p><code>unenroll(spp_id, program_id)</code></p>

unenroll registrant from program in OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| spp_id | <code>string</code> | spp_id of group / individual wanted to unenroll |
| program_id | <code>string</code> | program_id of program |

**Example**
```js
unenroll("IND_Q4VGGZPF", "PROG_2023_00000001")
```

* * *

### updateGroup

<p><code>updateGroup(group_id, data) ⇒ Operation</code></p>

update group for OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| group_id | <code>string</code> | group registrant id |
| data | <code>object</code> | registrant update data |

**Example**
```js
updateGroup("GRP_B2BRHJN2", { name: "Group 1" })
```

* * *

### updateIndividual

<p><code>updateIndividual(individual_id, data) ⇒ Operation</code></p>

update individual for OpenSPP


| Param | Type | Description |
| --- | --- | --- |
| individual_id | <code>string</code> | individual registrant id |
| data | <code>object</code> | registrant update data |

**Example**
```js
updateIndividual("IND_8DUQL4M4", { name: "Individual 1" })
```

* * *


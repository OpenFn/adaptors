## Functions

<dl>
<dt>
    <a href="#addMember">addMember(params, [callback])</a></dt>
<dt>
    <a href="#archiveMember">archiveMember(params, [callback])</a></dt>
<dt>
    <a href="#deleteMember">deleteMember(params, [callback])</a></dt>
<dt>
    <a href="#listAudienceInfo">listAudienceInfo(query, [callback])</a></dt>
<dt>
    <a href="#listAudiences">listAudiences(query, [callback])</a></dt>
<dt>
    <a href="#listBatches">listBatches(params, [callback])</a></dt>
<dt>
    <a href="#listMembers">listMembers(params, [callback])</a></dt>
<dt>
    <a href="#startBatch">startBatch(params, [callback])</a></dt>
<dt>
    <a href="#tagMembers">tagMembers(params, [callback])</a></dt>
<dt>
    <a href="#updateMember">updateMember(params, [callback])</a></dt>
<dt>
    <a href="#updateMemberTags">updateMemberTags(params, [callback])</a></dt>
<dt>
    <a href="#upsertMembers">upsertMembers(params, [callback])</a></dt>
</dl>

## addMember

addMember(params, [callback]) ⇒ <code>Operation</code>
addMember to a list

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## archiveMember

archiveMember(params, [callback]) ⇒ <code>Operation</code>
archiveMember in a list

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## deleteMember

deleteMember(params, [callback]) ⇒ <code>Operation</code>
Permanently delete a member from a list

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## listAudienceInfo

listAudienceInfo(query, [callback]) ⇒ <code>Operation</code>
Get information about a specific list in your Mailchimp account.
Results include list members who have signed up but haven't confirmed their subscription yet and unsubscribed or cleaned.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | listId and query parameters |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## listAudiences

listAudiences(query, [callback]) ⇒ <code>Operation</code>
Get information about all lists in the account.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | Query parameters |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## listBatches

listBatches(params, [callback]) ⇒ <code>Operation</code>
listBatches

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## listMembers

listMembers(params, [callback]) ⇒ <code>Operation</code>
listMembers

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## startBatch

startBatch(params, [callback]) ⇒ <code>Operation</code>
Start a batch with a list of operations.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | operations batch job |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
startBatch(params)
```

* * *

## tagMembers

tagMembers(params, [callback]) ⇒ <code>Operation</code>
Tag members with a particular tag

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a tagId, members, and a list |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
tagMembers((state) => ({
  listId: "someId", // All Subscribers list
  tagId: "someTag", // User tag
  members: state.response.body.rows.map((u) => u.email),
}));
```
**Example**  
```js
tagMembers((state) => ({
  listId: "someId",
  tagId: "someTag",
  members: state.response.body.rows
    .filter((u) => u.allow_other_emails)
    .map((u) => u.email),
}));
```

* * *

## updateMember

updateMember(params, [callback]) ⇒ <code>Operation</code>
updateMember

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId,subscriberHash and member |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## updateMemberTags

updateMemberTags(params, [callback]) ⇒ <code>Operation</code>
updateMemberTags

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## upsertMembers

upsertMembers(params, [callback]) ⇒ <code>Operation</code>
Add or update a list members

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, users, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |

**Example**  
```js
upsertMembers((state) => ({
  listId: "someId",
  users: state.response.body.rows.map((u) => ({
    email: u.email,
    status: u.allow_other_emails ? "subscribed" : "unsubscribed",
    mergeFields: { FNAME: u.first_name, LNAME: u.last_name },
  })),
}));
```

* * *


## Functions

<dl>
<dt>
    <a href="#addmember">addMember(params, [callback])</a></dt>
<dt>
    <a href="#archivemember">archiveMember(params, [callback])</a></dt>
<dt>
    <a href="#deletemember">deleteMember(params, [callback])</a></dt>
<dt>
    <a href="#get">get(path, query, [callback])</a></dt>
<dt>
    <a href="#listaudienceinfo">listAudienceInfo(query, [callback])</a></dt>
<dt>
    <a href="#listaudiences">listAudiences(query, [callback])</a></dt>
<dt>
    <a href="#listbatches">listBatches(params, [callback])</a></dt>
<dt>
    <a href="#listmembers">listMembers(params, [callback])</a></dt>
<dt>
    <a href="#post">post(path, body, query, [callback])</a></dt>
<dt>
    <a href="#request">request(method, path, options, [callback])</a></dt>
<dt>
    <a href="#startbatch">startBatch(params, [callback])</a></dt>
<dt>
    <a href="#tagmembers">tagMembers(params, [callback])</a></dt>
<dt>
    <a href="#updatemember">updateMember(params, [callback])</a></dt>
<dt>
    <a href="#updatemembertags">updateMemberTags(params, [callback])</a></dt>
<dt>
    <a href="#upsertmembers">upsertMembers(params, [callback])</a></dt>
</dl>

The following functions are exported from the common adaptor:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#chunk">chunk()</a>
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
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt></dl>

## addMember

addMember(params, [callback]) ⇒ <code>Operation</code>

addMember to a list


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## archiveMember

archiveMember(params, [callback]) ⇒ <code>Operation</code>

archiveMember in a list


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## deleteMember

deleteMember(params, [callback]) ⇒ <code>Operation</code>

Permanently delete a member from a list


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## get

get(path, query, [callback]) ⇒ <code>Operation</code>

The get function is used to make a GET request to the Mailchimp API.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The endpoint of the api to which the request should be made |
| query | <code>object</code> | An object containing query parameters to be included in the request |
| [callback] | <code>function</code> | (Optional) callback to handle the response |

**Example** *(Get a list of account exports for a given account)*  
```js
get('/account-exports');
```

* * *

## listAudienceInfo

listAudienceInfo(query, [callback]) ⇒ <code>Operation</code>

Get information about a specific list in your Mailchimp account.
Results include list members who have signed up but haven't confirmed their subscription yet and unsubscribed or cleaned.


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | listId and query parameters |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## listAudiences

listAudiences(query, [callback]) ⇒ <code>Operation</code>

Get information about all lists in the account.


| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | Query parameters |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## listBatches

listBatches(params, [callback]) ⇒ <code>Operation</code>

listBatches


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## listMembers

listMembers(params, [callback]) ⇒ <code>Operation</code>

listMembers


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## post

post(path, body, query, [callback]) ⇒ <code>Operation</code>

The post function is used to make a POST request to the Mailchimp API.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The endpoint of the api to which the request should be made. |
| body | <code>object</code> | The data to be sent in the body of the request |
| query | <code>object</code> | An object containing query parameters to be included in the request |
| [callback] | <code>function</code> | (Optional) callback to handle the response |

**Example** *(Create a new account export in your Mailchimp account)*  
```js
post('/accounts-export', {include_stages:[]});
```

* * *

## request

request(method, path, options, [callback]) ⇒ <code>Operation</code>

Make an HTTP request to Mailchimp API


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE'). |
| path | <code>string</code> | The endpoint of the api to which the request should be made. |
| options | <code>Object</code> | Additional options for the request (query, body only). |
| [callback] | <code>function</code> | (Optional) callback function to handle the response. |

**Example** *(Get list to all other resources available in the API)*  
```js
request('GET','/');
```
**Example** *(Create a new account export in your Mailchimp account)*  
```js
request('POST','/accounts-export', {include_stages:[]});
```

* * *

## startBatch

startBatch(params, [callback]) ⇒ <code>Operation</code>

Start a batch with a list of operations.


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


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId,subscriberHash and member |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## updateMemberTags

updateMemberTags(params, [callback]) ⇒ <code>Operation</code>

updateMemberTags


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | a listId, and options |
| [callback] | <code>function</code> | Optional callback to handle the response |


* * *

## upsertMembers

upsertMembers(params, [callback]) ⇒ <code>Operation</code>

Add or update a list members


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


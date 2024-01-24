## Functions

<dl>
<dt>
    <a href="#createtask">createTask(params, callback)</a></dt>
<dt>
    <a href="#gettask">getTask(taskGid, params, callback)</a></dt>
<dt>
    <a href="#gettasks">getTasks(projectGid, params, callback)</a></dt>
<dt>
    <a href="#updatetask">updateTask(taskGid, params, callback)</a></dt>
<dt>
    <a href="#upserttask">upsertTask(projectGid, params, callback)</a></dt>
</dl>


## createTask

createTask(params, callback) ⇒ <code>Operation</code>

Create a task.


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Body parameters |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
createTask(
 {
   name: 'test', "approval_status": "pending", "assignee": "12345"
 }
)
```

* * *

## getTask

getTask(taskGid, params, callback) ⇒ <code>Operation</code>

Get a single task of a given project.


| Param | Type | Description |
| --- | --- | --- |
| taskGid | <code>string</code> | Globally unique identifier for the task |
| params | <code>object</code> | Query params to include. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
getTask("taskGid",
 {
   opt_fields: "name,notes,assignee"
 })
```

* * *

## getTasks

getTasks(projectGid, params, callback) ⇒ <code>Operation</code>

Get the list of tasks for a given project.


| Param | Type | Description |
| --- | --- | --- |
| projectGid | <code>string</code> | Globally unique identifier for the project |
| params | <code>object</code> | Query params to include. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
getTasks("projectGid",
 {
   opt_fields: "name,notes,assignee"
 })
```

* * *

## updateTask

updateTask(taskGid, params, callback) ⇒ <code>Operation</code>

Update a specific task.


| Param | Type | Description |
| --- | --- | --- |
| taskGid | <code>string</code> | Globally unique identifier for the task |
| params | <code>object</code> | Body parameters |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
updateTask("taskGid",
 {
   name: 'test', "approval_status": "pending", "assignee": "12345"
 }
)
```

* * *

## upsertTask

upsertTask(projectGid, params, callback) ⇒ <code>Operation</code>

Update or create a task.


| Param | Type | Description |
| --- | --- | --- |
| projectGid | <code>string</code> | Globally unique identifier for the project |
| params | <code>object</code> | an object with an externalId and some task data. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
upsertTask(
 "1201382240880",
 {
   "externalId": "name",
   "data": {
     name: 'test', "approval_status": "pending", "assignee": "12345"
   }

 }
)
```

* * *


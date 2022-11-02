<a name="module_Adaptor"></a>

## Adaptor

* [Adaptor](#module_Adaptor)
    * [.execute(operations)](#module_Adaptor.execute) ⇒ <code>Operation</code>
    * [.getTask(task_gid, params, callback)](#module_Adaptor.getTask) ⇒ <code>Operation</code>
    * [.getTasks(project_gid, params, callback)](#module_Adaptor.getTasks) ⇒ <code>Operation</code>
    * [.updateTask(task_gid, params, callback)](#module_Adaptor.updateTask) ⇒ <code>Operation</code>
    * [.createTask(params, callback)](#module_Adaptor.createTask) ⇒ <code>Operation</code>
    * [.upsertTask(project_gid, params, callback)](#module_Adaptor.upsertTask) ⇒ <code>Operation</code>

<a name="module_Adaptor.execute"></a>

### Adaptor.execute(operations) ⇒ <code>Operation</code>
Execute a sequence of operations.
Wraps `language-common/execute`, and prepends initial state for http.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  

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
<a name="module_Adaptor.getTask"></a>

### Adaptor.getTask(task_gid, params, callback) ⇒ <code>Operation</code>
Get a single task of a given project.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| task_gid | <code>string</code> | Globally unique identifier for the task |
| params | <code>object</code> | Query params to include. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
getTask("task_gid",
 {
   opt_fields: "name,notes,assignee"
 })
```
<a name="module_Adaptor.getTasks"></a>

### Adaptor.getTasks(project_gid, params, callback) ⇒ <code>Operation</code>
Get the list of tasks for a given project.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| project_gid | <code>string</code> | Globally unique identifier for the project |
| params | <code>object</code> | Query params to include. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
getTasks("project_gid",
 {
   opt_fields: "name,notes,assignee"
 })
```
<a name="module_Adaptor.updateTask"></a>

### Adaptor.updateTask(task_gid, params, callback) ⇒ <code>Operation</code>
Update a specific task.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| task_gid | <code>string</code> | Globally unique identifier for the task |
| params | <code>object</code> | Body parameters |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
updateTask("task_gid",
 {
   name: 'test', "approval_status": "pending", "assignee": "12345"
 }
)
```
<a name="module_Adaptor.createTask"></a>

### Adaptor.createTask(params, callback) ⇒ <code>Operation</code>
Create a task.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  

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
<a name="module_Adaptor.upsertTask"></a>

### Adaptor.upsertTask(project_gid, params, callback) ⇒ <code>Operation</code>
Update or create a task.

**Kind**: static method of [<code>Adaptor</code>](#module_Adaptor)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| project_gid | <code>string</code> | Globally unique identifier for the project |
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

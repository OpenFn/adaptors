## Functions

<dl>
<dt><a href="#createTask">createTask(params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Create a task.</p>
</dd>
<dt><a href="#getTask">getTask(task_gid, params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get a single task of a given project.</p>
</dd>
<dt><a href="#getTasks">getTasks(project_gid, params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Get the list of tasks for a given project.</p>
</dd>
<dt><a href="#updateTask">updateTask(task_gid, params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Update a specific task.</p>
</dd>
<dt><a href="#upsertTask">upsertTask(project_gid, params, callback)</a> ⇒ <code>Operation</code></dt>
<dd><p>Update or create a task.</p>
</dd>
</dl>

<a name="createTask"></a>

## createTask(params, callback) ⇒ <code>Operation</code>
Create a task.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>params</td><td><code>object</code></td><td><p>Body parameters</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
createTask(
 {
   name: 'test', "approval_status": "pending", "assignee": "12345"
 }
)
```

* * *

<a name="getTask"></a>

## getTask(task_gid, params, callback) ⇒ <code>Operation</code>
Get a single task of a given project.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>task_gid</td><td><code>string</code></td><td><p>Globally unique identifier for the task</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>Query params to include.</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getTask("task_gid",
 {
   opt_fields: "name,notes,assignee"
 })
```

* * *

<a name="getTasks"></a>

## getTasks(project_gid, params, callback) ⇒ <code>Operation</code>
Get the list of tasks for a given project.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>project_gid</td><td><code>string</code></td><td><p>Globally unique identifier for the project</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>Query params to include.</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
getTasks("project_gid",
 {
   opt_fields: "name,notes,assignee"
 })
```

* * *

<a name="updateTask"></a>

## updateTask(task_gid, params, callback) ⇒ <code>Operation</code>
Update a specific task.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>task_gid</td><td><code>string</code></td><td><p>Globally unique identifier for the task</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>Body parameters</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
updateTask("task_gid",
 {
   name: 'test', "approval_status": "pending", "assignee": "12345"
 }
)
```

* * *

<a name="upsertTask"></a>

## upsertTask(project_gid, params, callback) ⇒ <code>Operation</code>
Update or create a task.

**Kind**: global function  
**Access**: public  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>project_gid</td><td><code>string</code></td><td><p>Globally unique identifier for the project</p>
</td>
    </tr><tr>
    <td>params</td><td><code>object</code></td><td><p>an object with an externalId and some task data.</p>
</td>
    </tr><tr>
    <td>callback</td><td><code>function</code></td><td><p>(Optional) callback function</p>
</td>
    </tr>  </tbody>
</table>

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


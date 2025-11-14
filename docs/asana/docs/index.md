<dl>
<dt>
    <a href="#createtask">createTask(params, callback)</a></dt>
<dt>
    <a href="#createtaskstory">createTaskStory(taskGid, params, callback)</a></dt>
<dt>
    <a href="#gettask">getTask(taskGid, params, callback)</a></dt>
<dt>
    <a href="#gettasks">getTasks(projectGid, params, callback)</a></dt>
<dt>
    <a href="#request">request(path, params, callback)</a></dt>
<dt>
    <a href="#searchtask">searchTask(task, [query], [options])</a></dt>
<dt>
    <a href="#updatetask">updateTask(taskGid, data, callback)</a></dt>
<dt>
    <a href="#upserttask">upsertTask(projectGid, params, callback)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
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
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
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
### createTask

<p><code>createTask(params, callback) ⇒ Operation</code></p>

Create a task.


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Body parameters |
| callback | <code>function</code> | (Optional) callback function |


**Example**
```js
createTask({
  name: "test",
  approval_status: "pending",
  assignee: "12345",
  projects: ["1206933955023739"],
});
```

* * *

### createTaskStory

<p><code>createTaskStory(taskGid, params, callback) ⇒ Operation</code></p>

Create a story to a specific task.


| Param | Type | Description |
| --- | --- | --- |
| taskGid | <code>string</code> | Globally unique identifier for the task |
| params | [<code>StoryOptions</code>](#storyoptions) | Story parameters |
| callback | <code>function</code> | (Optional) callback function |


**Example:** Create a plain text comment
```js
createTaskStory("1206933955023739", {
  text: "This is a comment",
});
```
**Example:** Create a HTML formatted text comment
```js
createTaskStory("1206933955023739", {
  html_text: "<body>This is a comment</body>",
});
```

* * *

### getTask

<p><code>getTask(taskGid, params, callback) ⇒ Operation</code></p>

Get a single task of a given project.


| Param | Type | Description |
| --- | --- | --- |
| taskGid | <code>string</code> | Globally unique identifier for the task |
| params | <code>object</code> | Query params to include. |
| params.opt_fields | <code>string</code> | The fields to return. |
| callback | <code>function</code> | (Optional) callback function |


**Example:** Get a task
```js
getTask("1206933955023739", {
  opt_fields: "name,notes,assignee",
});
```

* * *

### getTasks

<p><code>getTasks(projectGid, params, callback) ⇒ Operation</code></p>

Get the list of tasks for a given project.


| Param | Type | Description |
| --- | --- | --- |
| projectGid | <code>string</code> | Globally unique identifier for the project |
| params | <code>object</code> | Query params to include. |
| params.limit | <code>number</code> | The maximum number of tasks to return. |
| params.opt_fields | <code>string</code> | The fields to return. |
| callback | <code>function</code> | (Optional) callback function |


**Example:** Get all tasks
```js
getTasks("1206933955023739", {
  opt_fields: "name,notes,assignee",
});
```
**Example:** Limit the number of tasks returned
```js
getTasks("1206933955023739", {
  opt_fields: "name,notes,assignee",
  limit: 100,
});
```

* * *

### request

<p><code>request(path, params, callback) ⇒ Operation</code></p>

Make a HTTP request against the Asana API.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to resource (excluding api/version) |
| params | [<code>RequestOptions</code>](#requestoptions) | (Optional) Query, body and method parameters |
| callback | <code>function</code> | (Optional) Callback function |


**Example**
```js
Get a task by id
request("/tasks/1234");
```
**Example**
```js
Query for tasks in a given project
request("/tasks", {
  query: { project: "abc" },
});
```
**Example**
```js
Create a new task
request("/tasks", {
  method: "POST",
  body: { data: { name: "do the thing", completed: false } },
});
```

* * *

### searchTask

<p><code>searchTask(task, [query], [options]) ⇒ Operation</code></p>

Search for tasks in a workspace by task name.

**Returns**: <code>Operation</code> - An operation that, when executed, returns the search results in state.data.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| task | <code>string</code> |  | The text or name of the task to search for. |
| [query] | <code>object</code> |  | Query params. See [Docs](https://developers.asana.com/reference/searchtasksforworkspace) for a list of valid parameters. |
| [query.resource_subtype] | <code>string</code> | <code>&quot;default_task&quot;</code> | The resource subtype to search for. Must be either `"default_task"` or `"milestone"`. Defaults to `"default_task"`. |
| [options] | <code>object</code> |  | (Optional) options argument. |
| [options.workspaceGid] | <code>string</code> |  | The workspace to search in. Defaults to the workspace specified in the configuration. |


**Example:** Search for a task by name
```js
searchTask("Test Search Task", {
  sort_by: "modified_at"
});
```
**Example:** Search for a task by custom field only
```js
searchTask("", {
  "custom_fields.12345.value": $.data.custom_field_value,
});
```
**Example:** Search for a task by name and custom field
```js
searchTask("Test Search Task", {
  "custom_fields.12345.is_set": true,
});
```
**Example:** Search for a milestone by name
```js
searchTask("Test Search Task", {
  resource_subtype: "milestone",
});
```

* * *

### updateTask

<p><code>updateTask(taskGid, data, callback) ⇒ Operation</code></p>

Update a specific task.


| Param | Type | Description |
| --- | --- | --- |
| taskGid | <code>string</code> | Globally unique identifier for the task |
| data | <code>object</code> | Body data to update the task with |
| callback | <code>function</code> | (Optional) callback function |


**Example:** Update a task
```js
updateTask("1206933955023739", {
  name: "test",
  approval_status: "pending",
  assignee: "12345",
});
```

* * *

### upsertTask

<p><code>upsertTask(projectGid, params, callback) ⇒ Operation</code></p>

Update or create a task.


| Param | Type | Description |
| --- | --- | --- |
| projectGid | <code>string</code> | Globally unique identifier for the project |
| params | <code>object</code> | an object with an externalId and some task data. |
| params.externalId | <code>string</code> | The external id field name |
| params.data | <code>object</code> | The data to upsert. |
| callback | <code>function</code> | (Optional) callback function |


**Example:** Upsert a task
```js
upsertTask("1201382240880", {
  externalId: "name",
  data: {
    name: "test",
    approval_status: "pending",
    projects: ["1201382240880"],
    assignee: "12345",
  },
});
```

* * *


##  Interfaces

### RequestOptions

Options provided to the Asana API request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | Body data to append to the request. |
| query | <code>object</code> | An object of query parameters to be encoded into the URL. |
| method | <code>string</code> | The HTTP method to use. Defaults to `GET` |


* * *

### StoryOptions

Options provided to the createTaskStory request


**Properties**

| Name | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The plain text of the comment to add. Cannot be used with html_text. |
| html_text | <code>string</code> | Opt In. HTML formatted text for a comment. This will not include the name of the creator. |
| is_pinned | <code>boolean</code> | Default to `false`. Whether the story should be pinned on the resource. |
| sticker_name | <code>string</code> | The name of the sticker in this story. `null` if there is no sticker. |
| opt_fields | <code>array</code> | Opt In. This endpoint returns a compact resource, which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. |
| opt_pretty | <code>boolean</code> | Defaults to `false`. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. |


* * *


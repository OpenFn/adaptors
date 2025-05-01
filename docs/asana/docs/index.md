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
    <a href="#updatetask">updateTask(taskGid, params, callback)</a></dt>
<dt>
    <a href="#upserttask">upsertTask(projectGid, params, callback)</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#alterstate">alterState()</a>
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
    <a href="/adaptors/packages/common-docs#http">http</a>
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
| callback | <code>function</code> | (Optional) callback function |

**Example**
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
| callback | <code>function</code> | (Optional) callback function |

**Example**
```js
getTasks("1206933955023739", {
  opt_fields: "name,notes,assignee",
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

### updateTask

<p><code>updateTask(taskGid, params, callback) ⇒ Operation</code></p>

Update a specific task.


| Param | Type | Description |
| --- | --- | --- |
| taskGid | <code>string</code> | Globally unique identifier for the task |
| params | <code>object</code> | Body parameters |
| callback | <code>function</code> | (Optional) callback function |

**Example**
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
| callback | <code>function</code> | (Optional) callback function |

**Example**
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


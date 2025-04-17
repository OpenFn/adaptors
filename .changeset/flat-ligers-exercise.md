---
'@openfn/language-common': minor
---

Add query params to logged url responses.

When you make a `GET` request using a query:

```
http.get("comments", {  query:{
    postId: 1
}})


```

The logs will include the query parameter for the rquest and you will get:

```
GET https://jsonplaceholder.typicode.com/commentspostId=1& - 200 in 159ms

```

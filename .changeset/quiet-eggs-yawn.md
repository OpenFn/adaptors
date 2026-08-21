---
'@openfn/language-commcare': minor
---

Add opt-in pagination to `http.get`. Pass `params.paginate: true` to accumulate all pages into `state.data`, or also provide a callback to stream each page without accumulating.

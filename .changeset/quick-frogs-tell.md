---
'@openfn/language-primero': minor
---

Modify `composeNextState` so that `getCases` can pass it a third argument: the
metadata from Primero's response.

`getCases` will now not only return an array of `cases` in `state.data`, but
metadata related to pagination in `state.metadata`.

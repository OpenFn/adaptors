---
'@openfn/language-salesforce': major
---

- Restructured response format for `bulk`, `create`,`update` and `destroy`
  functions into standardized result structure:
  ```
  {
    success: boolean,
    completed: [id],
    errors: [{ id message }],
  }
  ```

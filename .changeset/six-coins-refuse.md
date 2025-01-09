---
'@openfn/language-salesforce': major
---

- Restructured response format for `bulk`, `create`,`update` and `destroy`
  functions:
  - Added standardized result structure:
    ```
    {
      success: boolean,
      completed: number,
      errors: [
        {
          id: string,
          message: string
        }
      ]
    }
    ```

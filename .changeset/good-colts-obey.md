---
'@openfn/language-salesforce': minor
---

- Enforce that `upsert`, `create` and `update` do not accept dot-notated
  relationships. Relationships should be nested instead. Eg, do this:
  ```
  create('Project', {
   "Project__r": {
     "Metrics_ID__c": "value"
   }
  })
  ```
  Not this:
  ```
  create('Project', {
   "Project__r.Metrics_ID__c": "value"
  })
  ```
- Add support for nested relationships in `bulk` (the adaptor will flatten them
  to dot-notation for you)

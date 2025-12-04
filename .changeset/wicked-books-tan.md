---
'@openfn/language-kobotoolbox': major
---

Update default pagination limits to comply with new KoboToolbox API restrictions:
- `DEFAULT_LIMIT`: Changed from 30,000 to 1,000 (maximum results per request)
- `DEFAULT_PAGE_SIZE`: Changed from 10,000 to 100 (items per page)

## Migration Guide

If a workflow depends on fetching more than 1,000 submissions in a single call, then the code needs to be updated:

### Before

Previously fetched up to 30,000 items

```js
getSubmissions('formId'); 
```

### After

**Option 1 - Fetch all submissions:**

- Fetch all available submissions

```js
getSubmissions('formId', { limit: Infinity }); 
```

**Option 2 - Specify custom limit:**

- Fetch up to 5,000 submissions

```js
getSubmissions('formId', { limit: 5000 }); // 
```

**Option 3 - Use pagination with start:**
```js
// First batch
getSubmissions('formId', { limit: 1000 });

// Next batch
getSubmissions('formId', { start: 1000, limit: 1000 });
```


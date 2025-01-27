---
name: New adaptor
about: Requests for new adaptors
title: ''
labels: ['adaptor', 'feature request']
assignees: ''
---

_Fill out this template with as much information as you can about the adaptor
you want. You can always come back later and add more detail. Usually we like to
build a minimal "HTTP client" first, with basic http helpers, and then build up
more complex and helpful functions later._

## Request

_What is the new adaptor you want to build? And at a high-level, what should
this adaptor do?_

_Example Text:_

```
We want to build a basic adaptor to integrate with the REST API for `App X`, which does [add description].

To start, this adaptor should:
1. handle authentication
2. include a generic GET helper so we can get any resource
3. make it easy to search for particular records and return results in JSON
```

## Credentials

- **Login credentials:** _Provide login credentials to a demo/test/sandbox
  environment._
- **Test record(s):** _Add links or descriptions on how to access test data._
- **Authentication method(s):** _Note if this adaptor should handle specific API
  protocols (e.g., Oauth, API Key), ensure the right access is configured, and
  provide links to relevant app/API documentation._

_Example Text:_

```
See LP `CHT Demo Project` for login information for authentication via Basic Auth.
You'll find that there is already some dummy data for `contacts` in the systems to query.
```

## Sample Code

_If you like, you can include an example of what job code using your adaptor
might look like_

```
get('/Patients', { query: { limit: 10 }})
```

## Resources

_Add links to API docs and any other app docs that might be useful_

### Logo Links

_Add links to where to find the app's logo for the adaptor logo_

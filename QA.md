## Adaptor QA Checklist

### Setup

- [ ] Adaptor is listed on [app.openfn.org](https://app.openfn.org)
- [ ] Adaptor has documentation on [docs.openfn.org](https://docs.openfn.org)
- [ ] Adaptor logo is correct on app.openfn.org
- [ ] Adaptor has a configurable credential on app.openfn.org
- [ ] Unit tests are present and passing
- [ ] README includes relevant examples
- [ ] Adaptor is listed in
      [`openfn/adaptors`](https://github.com/openfn/adaptors)
- [ ] Release has been announced in the community

### Functionality

- [ ] Exports common and HTTP methods (if applicable)
- [ ] Functions work as documented (e.g., `get("case")`)
- [ ] Supports at least basic CRUD and list operations
- [ ] `create()` and `update()` return the full resulting object
- [ ] All resulting data is stored in `state.data`
- [ ] Logs are clear and descriptive of adaptor behavior

### Documentation

- [ ] Credential setup was clear (tested without needing dev assistance)
- [ ] Docs include examples for credential configuration
- [ ] Function usage instructions are clear
- [ ] Each function has lean, captioned examples
- [ ] Optional/required attributes behave as documented

### Errors

- [ ] Error messages are meaningful and human-readable
- [ ] Invalid credentials tested and handled
- [ ] Invalid object fetch returns clear error
- [ ] Invalid ID fetch returns clear error
- [ ] Missing required fields in `create()` return proper error
- [ ] Creating object with unknown attributes returns proper error
- [ ] No crashes on handled errors (e.g., 404s should not crash)

### Security

- [ ] No sensitive information is logged throughout QA process

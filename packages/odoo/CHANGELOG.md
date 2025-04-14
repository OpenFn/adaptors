# @openfn/language-odoo

## 1.0.4 2025 April 11

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 1.0.3 2025 March 14

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 1.0.2 2025 March 12

### Patch Changes

* cde1ead: Add a `downloadNewRecord: true` option to `create` to enable
  downloading of the whole record in the response.

  ```js
  create('res.partner', { name: 'Kool Keith' }, { downloadNewRecord: true });
  fn(state => {
    const record = state.data; // whole record is here
    return state;
  });
  ```

## 1.0.1 2025 February 24

### Patch Changes

* 2f58a71: Default `create()` options to `{}` to ensure that the options
  argument is optional.
* e26fbd5: Simplified logging across the adaptor without displaying user data
* 2db9f8d: Update the third argument in `read()` examples and documentation to
  explicitly indicate that it accepts an array of strings.

## 1.0.0 2025 February 18

Initial release.

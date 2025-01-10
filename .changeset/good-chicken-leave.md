---
'@openfn/language-salesforce': major
---

Move `toUTF8()` to `util.UTF8()`. `toUTF8` is not an operation and cannot be
called at the top level. Moving into the utils namespace should help make the
usage of the function a little clearer

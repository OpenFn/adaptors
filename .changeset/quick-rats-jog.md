---
'@openfn/language-odoo': patch
---

Add a `downloadNewRecord: true` option during `create` to enable downloading of the
whole record in the response.

```
create("res.partner", { name: "Kool Keith" }, {downloadNewRecord: true});

```

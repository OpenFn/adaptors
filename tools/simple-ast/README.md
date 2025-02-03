# Simple AST

Generate an AST for the exported functions in a language-package that can be
read by Open Function's front-end to provide users with click-to-add function
assistance for writing job expressions.

## usage

This is normally called by the `bundle` script of OpenFn's language-packages
module after the adaptor is `built` but before it is tarballed for a release.

## cli usage

```sh
node ./lib/generate.js --adaptor ~/language-http/src/Adaptor.js --output ./tmp/ast.json
```

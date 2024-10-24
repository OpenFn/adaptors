## Fhir builder

# Usage

Generate a new fhir adaptor

```
pnpm generate-fhir <name> <spec> <base>
```

- name is the name of your adaptor (`jembi`) EXCLUDING `fhir-`
- spec is where you want to load the spec from
- base is the base adaptor you want to use. don't proide this if generating a
  base adaptor. maybe this is jsut a version number?

If the directory does not exist, the adaptor boiler plate will be generated for
you -- generate-package.ts

If the dir does exist, it'll just generate new source files

use build/mappings.js to define any mapping logic

# base?

base is something like: where do you want to import the datatype helpers from?

Ah, here we go:

if base is provided, as a package name, then datatypes will be imported from
there

if no base is provided, a stub file will be generated

# mappings

# Spec

# Updating

Within an adaptor, run `pnpm build:src`. This will just call
`pnpm generate-fhir` again for you

What to do about spec? Check it in? It's probably big. use spec.json as a
convention? that makes ense

# spec

we recommend creating a npm fetch:spec command to redownload your spec

# base adaptors

if generating for a core fhir verison likr r4,r5... do this

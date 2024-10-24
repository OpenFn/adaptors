## Fhir builder

# Usage

## Generate a new fhir adaptor

```
pnpm generate-fhir <name> [--spec] [--respec]
```

- name is the name of your adaptor (`jembi`) EXCLUDING `fhir-`
- spec is a URL to the specification file (currently URL to a json zip)

If the directory does not exist, the adaptor boiler plate will be generated for
you. `--spec` must be provided for first-time generation, with a url to the spec
file.

If the directory does not exist, or --respec is passed, the spec file is
redownloaded. You can pass in a new spec url, or the adaptor will re-use the
same url used last time.

## Re-build the adaptor from the spec

```
pnpm generate-fhir <name>
```

## Re-download the spec

```
pnpm generate-fhir <name> --respec
```

# How it works

The generated adaptor's package.json has a `fhir` property, which gives metadata
about the last time the adaptor was generated. It tells you the path used to get
a spec, the date, name and version of the spec, and a date for when the adaptor
was last built.

The generator will run through the following steps each time it's called:

- Maybe generate adaptor template boiler-plate
- Maybe download and extract the spec
- Rebuild all generated source files
- Update the package.json metadata as appropriate

Note the adaptor template stuff is not re-generated. The only re-generated files
on build are in [src/gen] (or something.)

# base?

base is something like: where do you want to import the datatype helpers from?

Ah, here we go:

if base is provided, as a package name, then datatypes will be imported from
there

if no base is provided, a stub file will be generated

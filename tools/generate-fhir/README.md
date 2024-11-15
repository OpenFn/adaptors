## Fhir builder

Dev tooling to generate a FHIR adaptor based on a FHIR spec (provided as a URL)

The `generate-fhir` command will do up to three things for you:

1. Generate an adaptor package with defaults
2. Download, extract and parse the spec defined in the input URL
3. Generate Javascript builder functions based on the spec to create resources

Run `pnpm generate-fhir --help` from root for help in your terminal.

# Example

```bash
pnpm generate-fhir fhir-jembi --spec https://build.fhir.org/ig/jembi/ethiopia-hiv/branches/master/definitions.json.zip
```

# Usage

## Generate a new fhir adaptor

```
pnpm generate-fhir <name> --spec <www>
```

Where:

- name is the name of your adaptor (`jembi`) EXCLUDING `fhir-`
- www is a URL to the specification file (currently URL to a json zip)

If the directory does not exist, the adaptor boiler-plate will be generated for
you. `--spec` must be provided for first-time generation, with a url to the spec
file.

If the directory does not exist, or --respec is passed, the spec file is
redownloaded. You can pass in a new spec url, or the adaptor will re-use the
same url used last time.

## Re-build the adaptor from a previously parsed spec

```
pnpm generate-fhir <name>
```

## Re-download the spec

```
pnpm generate-fhir <name> --respec
```

## Update the spec URL

```
pnpm generate-fhir <name> --spec www
```

(or modify package.json)

# How it works

The `generate-fhir` command will first look to see if the package you've asked
for exists.

If it does not, the adaptor boiler-plate will be generated for you. `--spec`
must be provided for first-time generation, with a url to the spec file.

The spec url you pass in will be saved to the generated adaptor, so it's easy to
re-generate from he same URL.

On the first build, the spec will be downloaded, parsed and extracted and saved
to disk.

The raw FHIR spec JSON will be written to `./spec/`

The tooling takes that raw JSON and parses it into a "schema". This is a
proprietary JSON format used by our generation tooling which just makes it a bit
easier to do the kind of code generation we do. Those schema files are then
written to `./schema/`

You can force the spec to be re-downloaded and parsed any time by passing
`--respec` into the command.

Finally, the generator will read in the schema definitions and generate the
actual source code. You can re-generate this source by running
`pnpm generate-fhir <name>` again.

The generated source is checked into the repo and not rebuilt by CI. To update
the adaptor source, you need to update/redownload the spec, update the mapping
rules, or modify the code generator and check in the changes with a changeset.

The generated adaptor's package.json has a `fhir` property, which gives metadata
about the last time the adaptor was generated. It tells you the path used to get
a spec, the date, name and version of the spec, and a date for when the adaptor
was last built.

The generator will run through the following steps each time it's called:

- Maybe generate adaptor template boiler-plate
- Maybe download and extract the spec
- Rebuild all generated source files
- Update the package.json metadata as appropriate

Note the adaptor template stuff is never re-generated. The only re-generated
files on build are in [src/gen] (or something) and are clearly marked

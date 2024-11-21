# language-fhir-ndr-et <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the FHIR API
for NDR Ethopia.

## Documentation

This adaptor is largely auto-generated from the spec at
https://build.fhir.org/ig/jembi/ethiopia-hiv/branches/master/definitions.json.zip.
See below for more details about that.

We **strongly** recommend not editing generated source files by hand! Better to
update the spec, mappings, or code generation rules. Otherwise your changes will
be lost.

Unlike most adaptors, types are checked-in (because they are largely
autogenerated). A custom dts build is used.

View the [docs site](https://docs.openfn.org/adaptors/packages/fhir-ndr-et-docs)
for full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/fhir-ndr-et-configuration-schema/)
for required and optional `configuration` properties.

## Building

To generate the adaptor source, run `pnpm build:src`. This will generate the
builder functions and typings, but not generate all the other adaptor stuff,
like docs and dist.

The source is NOT rebuilt in CI or during a general repo build (because a change
to the remote spec can result in a diff in the source, and a diff in the source
creates problems all over)

The standard `pnpm build` will generate docs and typedefs and stuff, but NOT the
source.

So locally, run `pnpm build:src` to rebuild the adaptor code.

The first time the source build runs, a new "spec" file will be downloaded. To
force a new download (ie to update the spec) delete `./spec/spec.json`

## How to use

This adaptor provides a bunch of helper functions to create FHIR resources in
the right structure.

Use `builders.*` (or `b.*` for short) namespace to create resource types, like
this:

```
fn(() => {
  const encounter = builders.encounter('target-facility-encounter', {
    id,
    /* add props as needed */
  });
})
```

All supported resource types have a main function on the `builders` object. The
first argument is the profile id for that resource, the second is JSON data to
define the resource.

Code assist is available in Lightning for profile ids - just hit ctrl + space to
bring up the list. It's also available in VSC (see the
[Wiki article](https://github.com/OpenFn/adaptors/wiki/How-to-get-code-assist-for-adaptors-in-VSC))

The json object is designed to be smart and do stuff like generate references
automatically, or map typed keys like effective -> effectiveDateTime.

Typescript and documentation should help here although work is needed on this
stuff. The design is to give it a sensible value and trust it to do the right
thing.

See Resources.tests.js for some examples of creating the supported resources
from inputs.

As well as the builders, the adaptor also exports util functions to make it a
bit easier to create references, codeableconcepts, codings and so on.

So you can do stuff like this:

```js
fn(() => {
  const encounter = builders.encounter('target-facility-encounter', {
    id,
    subject: util.reference('some-resource-id'),
    class: util.coding([value, system]),
  });
});
```

## Code Generation

A number of files in `src` are auto-generated (you can tell because they have a
nice clear comment up at the top).

The build logic is all handled in the `build/` folder.

Here is roughly how the code generation works.

The objective is to read in the snapshot definition of all the fhir resources in
the destination system, and for each resource type that we're interested in,
generate a) an easy-to-use builder function and b) a list of typescript
definitions to match it.

First, we check to see whether `./spec/spec.json` exists if it does not,
download it!

Then we load this spec.json into memory. It's a large complex file so we break
it down into a simpler JSON representation which we call a schema.

The schema contains a simple expression of rules that our builder function will
need to apply. It looks a bit like this:

```json
{
  "id": "arv-regimen-medication",
  "type": "Medication",
  "url": "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-regimen-medication",
  "props": {
    "id": {
      "type": "string",
      "isArray": false,
      "desc": "Logical id of this artifact",
      "isComposite": false,
      "defaults": {}
    }
    // ...
  }
}
```

This tells us for exaple that an arv-regimen-medication has a property called
`id`, which is a type string. So our builder function will need to handle that.

We only generate a simple schema for the resource types we're interested in.
That's controlled by a file called `./build/mappings.ts`. The mappings has two
jobs:

1. Specific which resource types to generate builder functions for
2. Provide manual override rules for those builders. This lets us provide
   special mappings on keys for example, or provide defaults if the schema is
   missing some information.

So now we've generated simple schema objects for the resource types we're
interested in.

Next we generate the builder functions. We use a library call `ast-types` to
help us do this. Mostly we build an AST tree directly - that is, we
programmatically define the structure of the code using a neat API. And from
this structure we generate code strings with nice formatting.

This keeps our code generation nice and robust. The API ensures that the
generated code is syntactically valid, and throws errors if we ask it do do
something illegal - like nest a statement inside the condition of an
if-statement. If we were generating strings directly, we'd have to be very
careful about things like typos and couldn't apply smart transformations to the
code.

Using the schema information and mapping overrides, we generate code statements
to take the input data passed as the second argument, and apply it smartly to a
new FHIR resource, which we finally return. We lean heavily on the util
functions in `src/utils.js` to simplify this.

Once we've got our code, we have to generate matching TypeScript definitions for
each builder. This ensures that we get code assist and intellisense on our
generated functions, making the builders much safer and easier to use.

We use the TypeScript compiler to do this, just like how we use `ast-types` to
generate the code (although it has to be said that the TypeScript compiler has a
way less nice API).

Once finished, generated files are written into `src/`, where they can be
tested.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
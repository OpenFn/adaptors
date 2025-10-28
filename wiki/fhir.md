# Warning

Since releasing the new fhir-4 adaptor, the generator now generates code in TypeScript. It breaks existing support for generating adaptors from Implementation Guides - although this will be restored soon.

See https://github.com/OpenFn/adaptors/issues/955 for the gritty details

As a result, this guide is currently out of date and will be updated soon.

# Overview

We are implementing a solution to auto-generate a FHIR adaptor for a specific implementation based on the raw spec files.

The goals of the adaptor are:
- To provide a clean Javascript interface to build FHIR data structures
- To support this interface with code-assist in Lightning and VSC
- To automate rote and boiler-plate  fields
- To simplify creation of FHIR constructs like codings and extensions

It's really cool you guys.

# Using the Builders

The adaptor will expose a bunch of helper functions for you, called builders. Access them from the `builders` or `b` namespace. Like this:

```
const result = b.patient('patient', {
  id: input.id,
  religion: util.concept(
    religion.display,
    util.coding(
      religion.code,
      'http://terminology.hl7.org/CodeSystem/v3-ReligiousAffiliation'
    )
  ),
  identifier: input.identifier,
  name: input.name,
  telecom: input.telecom,
  gender: input.gender,
  birthDate: input.birthDate,
  maritalStatus: input.maritalStatus,
  managingOrganization: input.managingOrganization,
  address: input.address.map(mapAddress),
});
```
IMPORTANT: Builders are NOT operations and cannot be run at the top of your job code. Use them in `create()` calls or `fn()` callbacks.

As well as resource builders, also note the datatype builders in `util.`, ie, `util.coding.

A builder takes a profile name as the first argument (which should be provided by code assist), and a set of properties as the second. It returns a JSON FHIR resource.

NOTE: I'll soon make it so that if you don't pass a string as the  first argument, a default profile will be greated

Builders will default all required values and patterns on the generated objects.

[Note - I don't have the language for this bit yet, bear with me] Builders will simplify the creation of _typed fields_. For example if an extension supports `valueDateTime` or `valueString`, the  builder will expose a `value` field, which will be converted into the typed field name.

So if you do something like `builders.patient('patient', { value: '2024-11-02' })`, the builder will generate an object like `{ resourceType: 'Patient', valueDateTime: '2024-12-02' }` (TODO: find a better example)/

Builders also simplify extensions (this is still being worked on a bit). So a builder might provide a field called `nextVisitDate`, which will be converted in an extension and added to the extensions array, with the correct url, by the builder for you.

# Generating an adaptor

It's super easy to generate an adaptor for a FHIR implementation!

First, you'll need a link to your FHIR spec. Right now we use a zip bundle of JSON schema file (see input sources for more notes on this).

Run this command with your spec path:

```bash
pnpm generate-fhir jembi --spec https://build.fhir.org/ig/jembi/ethiopia-hiv/branches/master/definitions.json.zip
```
That will generate all this for you:

* Adaptor template code (all the normal stuff)
* A set of builder functions (one per resource type)
* A mapping file (you'll need this in a minute)
* A set of passing unit tests
* [soon] A set of skipped unit tests against example structures found in the spec

The tests are designed to give confidence - to you and stakeholders - that the builder functions work as you'd expect.

It is expected that you'll want to make some changes from the defaults. For example, you may want to exclude some data structures, or provide simple mappings to extensions, or provide default values that aren't in the spec.

To do this, you can modify the mappings file. This gives you a bunch of controls over what the generated adaptor looks like.

Once you've made mappings changes, you can re-build your adaptor with:

```bash
pnpm generate-fhir jembi
```
This will use the original spec and new mappings and generate new code for you. Only generated code files - which are clearly marked - are affected by this step. So you can add new sources, or edit tests, or update the readme file, and those changes will not be lost.

If the spec changes and you want to re-generate your adaptor to reflect the changes, run:

```bash
pnpm generate-fhir jembi --respec
```
This will re-download the spec and run the build again.

Note that package.json contains metadata about the last time the adaptor was generated, which is used by the tooling:
```json
{
  "name": "@openfn/language-fhir-jembi",
  "fhir": {
    "spec": "https://build.fhir.org/ig/jembi/ethiopia-hiv/branches/master/definitions.json.zip",
    "adaptorGeneratedDate": "2024-11-04T17:04:28.064Z",
    "name": "ethiopia.fhir.hiv",
    "specVersion": "4.0.1",
    "specDate": "2024-10-14"
  },
}
```
# Releasing

A generated FHIR adaptor must be released through the usual channels. Raise a PR and target it at main. We'll review and merge and it'll be released to npm and Lightning.

# Input Sources

At the moment, you have to give the generator a URL to a zip folder containing FHIR spec files as JSON.

But there are many ways to write and share FHIR specifications. The idea is that the generator will provide interfaces to all of them - including use FHIR tools like firely, or reading from XML formats or from github repos directly.

The concept - and it's super achieveable - is point our tool at any FHIR representation, local or remote, and we'll parse and generate from it.

# Using an Adaptor

Like any adaptor, you can use the builder functions with Lightning.

The Lightning editor should support full code assist for all builders: so when you start typing, it'll suggest the valid keys for you and provide inline documentation. This is neat.

You should be able to get code assist in VSC too, if you use the setup steps in this repo.

# Docs

At the moment docs for generated adaptors are pretty terrible - see [fhir-ndr-et](https://docs.openfn.org/adaptors/packages/fhir-ndr-et-docs#builders_encounter). 

But we have all the information needed to provide full inline documentation, documenting every valid property. We'll do that soon.
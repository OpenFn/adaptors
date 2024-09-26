work out how to fetch resources in bulk

maybe just take a lit and fetch then?

```
const getSpecs = (names) => { // call out to //
https://build.fhir.org/ig/jembi/ethiopia-hiv/branches/master/StructureDefinition-target-facility-encounter.json

// What's weird about this is that Encounter isn't in the url

}

```

all definitions in json
https://build.fhir.org/ig/jembi/ethiopia-hiv/branches/master/definitions.json.zip

we could use a script to download and extract, then pull in the defs we need

or I suppose we load them all into memory and filter by Resourcee Type

I like that

it's 20mb of data

we can cut out the html though

## typescript

ok how did I do typescript with fhir? How did I test?

Aha, there's test.js at the top of the repo. That should let me import and test
the built adaptor

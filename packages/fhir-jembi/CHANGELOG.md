# @openfn/language-fhir-jembi


## 0.0.17

- support more types in addExtension


## 0.0.16

- Add `text` to each resource type

## 0.0.15

- Update schema to lateest version

## 0.0.14

- add relatedPerson builder

## 0.0.13

- reference will generate a reference to a resource if you pass it in (in form type/id)
- add aliases for util.ref, util.id, util.cc
- properly track arrays of references

## 0.0.12

- Make util.findExtension safe for resources without an extension

## 0.0.11

- Add builders for MedicationDispense and Medication
- Tighten extension mapping

## 0.0.10

- Improvements to observation (map references, default static values, and handle value)

## 0.0.9

- Fix prop mapping which arent in an array util.
- concept accepts codings as anarray allow systems map to map system shorthands
  and longhands to new values
- Fix utils namespace

## 0.0.8

Ignore nullish keys in mapping (ie, passing undefined will not set a key on the
new object)

## 0.0.7

- restore all builders
- more docs in type defs

## 0.0.6

- Support more types
- remove generic property mapping - most props should map now

## 0.0.5

- restore patient and observation types
- hide internal builder functions

## 0.0.4

add type variants add flat assignment of props to resource

## 0.0.3

expose more stuff from common

## 0.0.2

expose fn

## 0.0.1

Initial alpha release.

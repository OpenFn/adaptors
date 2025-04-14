# @openfn/language-openspp

## 2.0.10 2025 April 11

### Patch Changes

* Updated dependencies \[d7105c0]
  * @openfn/language-common@2.3.2

## 2.0.9 2025 March 14

### Patch Changes

* Updated dependencies \[23ccb01]
  * @openfn/language-common@2.3.1

## 2.0.8 2025 January 16

### Patch Changes

* Updated dependencies \[b3d7f59]
* Updated dependencies \[2d709ff]
* Updated dependencies \[41e8cc3]
  * @openfn/language-common@2.3.0

## 2.0.7 2025 January 16

### Patch Changes

* Updated dependencies \[6dffdbd]
  * @openfn/language-common@2.2.1

## 2.0.6 2025 January 9

### Patch Changes

* Updated dependencies \[a47d8d5]
* Updated dependencies \[9240428]
  * @openfn/language-common@2.2.0

## 2.0.5 2024 October 28

### Patch Changes

* Updated docs for each()
* Updated dependencies
  * @openfn/language-common@2.1.1

## 2.0.4 2024 October 18

### Patch Changes

* Updated dependencies \[03a1a74]
  * @openfn/language-common@2.1.0

## 2.0.3 2024 October 15

### Patch Changes

* Fixed security vulnerability in jsonpath-plus \[33973a2]
  * @openfn/language-common@2.0.3

## 2.0.2 2024 September 24

### Patch Changes

* Updated dependencies \[77a690f]
  * @openfn/language-common@2.0.2

## 2.0.1 2024 August 16

### Patch Changes

* 8146c23: Fix typings in package.json
* Updated dependencies \[8146c23]
  * @openfn/language-common@2.0.1

## 2.0.0 2024 August 1

### Major Changes

* Export new common http helpers (http namespace)

## 1.3.1

### Patch Changes

* Updated dependencies \[4fe527c]
  * @openfn/language-common@2.0.0

## 1.3.0 2024 June 13

### Minor Changes

* 73433c20: Add `fnIf` operation

### Patch Changes

* Updated dependencies \[106ecf6d]
  * @openfn/language-common@1.14.0

## 1.2.1 2024 May 8

### Patch Changes

* Security updates (lodash,undici)
* Updated dependencies
  * @openfn/language-common@1.13.2

## 1.2.0 2023 November 30

### Changes

* 05defd2: add new functions, correcting docstring and add more examples
  * correcting docstring input parameters type
  * changing getServicePoint() from get by name into get by unique id
  * add more examples in docstring
  * getArea(): get existing area by id
  * searchArea(): search existing area by domain
  * searchServicePoint(): search existing service point by domain

## 1.1.1 2023 November 17

### Patch Changes

* 48b4e97: update `spp date time now string` format

## 1.1.0 2023 November 17

* Create OpenSPP adaptor with these functions:
  * getGroup(): get existing group information
  * getIndividual(): get existing individual information
  * searchGroup(): search existing group by domain
  * searchIndividual(): search existing individual by domain
  * getGroupMembers(): get members from group
  * getServicePoint(): get service points by name
  * getPrograms(): get single program
  * getPrograms(): get program list
  * getEnrolledPrograms(): get list of enrolled program for each beneficiary
  * enroll(): enroll beneficiary to a program
  * unenroll(): unenroll beneficiary from program
  * createIndividual(): create new individual
  * updateIndividual(): update existing individual
  * createGroup(): create new group
  * updateGroup(): update existing group
  * addToGroup(): add individual to group with(out) role
  * removeFromGroup(): end membership of individual to group

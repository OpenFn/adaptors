# @openfn/language-openspp

## 1.2.0

### Changes

- 05defd2: add new functions, correcting docstring and add more examples
  - correcting docstring input parameters type
  - changing getServicePoint() from get by name into get by unique id
  - add more examples in docstring
  - getArea(): get existing area by id
  - searchArea(): search existing area by domain
  - searchServicePoint(): search existing service point by domain

## 1.1.1

### Patch Changes

- 48b4e97: update `spp date time now string` format

## 1.1.0

- Create OpenSPP adaptor with these functions:
  - getGroup(): get existing group information
  - getIndividual(): get existing individual information
  - searchGroup(): search existing group by domain
  - searchIndividual(): search existing individual by domain
  - getGroupMembers(): get members from group
  - getServicePoint(): get service points by name
  - getPrograms(): get single program
  - getPrograms(): get program list
  - getEnrolledPrograms(): get list of enrolled program for each beneficiary
  - enroll(): enroll beneficiary to a program
  - unenroll(): unenroll beneficiary from program
  - createIndividual(): create new individual
  - updateIndividual(): update existing individual
  - createGroup(): create new group
  - updateGroup(): update existing group
  - addToGroup(): add individual to group with(out) role
  - removeFromGroup(): end membership of individual to group

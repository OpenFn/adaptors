export const searchEventsQuery = `
  query searchEvents(
    $advancedSearchParameters: AdvancedSearchParametersInput!
    $sort: String
    $count: Int
    $skip: Int
  ) {
    searchEvents(
      advancedSearchParameters: $advancedSearchParameters
      sort: $sort
      count: $count
      skip: $skip
    ) {
      totalItems
      results {
        id
        type
        registration {
          status
          contactNumber
          trackingId
          registrationNumber
          registeredLocationId
          duplicates
          assignment {
            practitionerId
            firstName
            lastName
            officeName
            __typename
          }
          createdAt
          modifiedAt
          __typename
        }
        operationHistories {
          operationType
          operatedOn
          operatorRole
          operatorName {
            firstNames
            familyName
            use
            __typename
          }
          operatorOfficeName
          operatorOfficeAlias
          notificationFacilityName
          notificationFacilityAlias
          rejectReason
          rejectComment
          __typename
        }
        ... on BirthEventSearchSet {
          dateOfBirth
          childName {
            firstNames
            familyName
            use
            __typename
          }
          __typename
        }
        ... on DeathEventSearchSet {
          dateOfDeath
          deceasedName {
            firstNames
            familyName
            use
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

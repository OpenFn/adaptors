export const getItemsQueryString = `
          query itemsWithStats($storeId: String!, $key: ItemSortFieldInput!, $isDesc: Boolean, $filter: ItemFilterInput, $first: Int, $offset: Int) {
            items(storeId: $storeId, sort: {key: $key, desc: $isDesc}, filter: $filter, page: {first: $first, offset: $offset}) {
              ... on ItemConnector {
                __typename
                nodes {
                  code
                  id
                  name
                  unitName
                  defaultPackSize
                  availableStockOnHand(storeId: $storeId)
                  stats(storeId: $storeId) {
                    averageMonthlyConsumption
                    availableStockOnHand
                    availableMonthsOfStockOnHand
                    monthsOfStockOnHand
                    totalConsumption
                    stockOnHand
                  }
                }
                totalCount
              }
            }
          }`;


export const insertOutboundShipmentQuery = `mutation insertOutboundShipment($id: String!, $otherPartyId: String!, $storeId: String!) {
  insertOutboundShipment(
    storeId: $storeId
    input: {id: $id, otherPartyId: $otherPartyId}
  ) {
    __typename
    ... on InvoiceNode {
      id
      invoiceNumber
    }
    ... on InsertOutboundShipmentError {
      __typename
      error {
        description
        ... on OtherPartyNotACustomer {
          __typename
          description
        }
        ... on OtherPartyNotVisible {
          __typename
          description
        }
        description
      }
    }
    ... on NodeError {
      __typename
      error {
        description
        ... on DatabaseError {
          __typename
          description
          fullError
        }
        ... on RecordNotFound {
          __typename
          description
        }
      }
    }
  }
}`


export const upsertOutboundShipmentQuery = `mutation upsertOutboundShipment($storeId: String!, $input: BatchOutboundShipmentInput!) {
  batchOutboundShipment(storeId: $storeId, input: $input) {
    __typename
    insertOutboundShipmentUnallocatedLines {
      id
      response {
        ... on InsertOutboundShipmentUnallocatedLineError {
          __typename
          error {
            description
          }
        }
        ... on InvoiceLineNode {
          id
        }
      }
    }
    deleteOutboundShipmentLines {
      id
      response {
        ... on DeleteOutboundShipmentLineError {
          __typename
          error {
            description
            ... on RecordNotFound {
              __typename
              description
            }
            ... on CannotEditInvoice {
              __typename
              description
            }
            ... on ForeignKeyError {
              __typename
              description
              key
            }
          }
        }
        ... on DeleteResponse {
          id
        }
      }
    }
    deleteOutboundShipmentServiceLines {
      id
      response {
        ... on DeleteResponse {
          id
        }
        ... on DeleteOutboundShipmentServiceLineError {
          __typename
          error {
            description
            ... on RecordNotFound {
              __typename
              description
            }
            ... on CannotEditInvoice {
              __typename
              description
            }
            ... on ForeignKeyError {
              __typename
              description
              key
            }
          }
        }
      }
    }
    deleteOutboundShipmentUnallocatedLines {
      id
      response {
        ... on DeleteResponse {
          id
        }
        ... on DeleteOutboundShipmentUnallocatedLineError {
          __typename
          error {
            description
            ... on RecordNotFound {
              __typename
              description
            }
          }
        }
      }
    }
    deleteOutboundShipments {
      id
      response {
        ... on DeleteResponse {
          id
        }
        ... on DeleteOutboundShipmentError {
          __typename
          error {
            description
            ... on RecordNotFound {
              __typename
              description
            }
            ... on CannotDeleteInvoiceWithLines {
              __typename
              description
            }
            ... on CannotEditInvoice {
              __typename
              description
            }
          }
        }
      }
    }
    insertOutboundShipmentLines {
      id
      response {
        ... on InsertOutboundShipmentLineError {
          __typename
          error {
            description
          }
        }
      }
    }
    insertOutboundShipmentServiceLines {
      id
      response {
        ... on InsertOutboundShipmentServiceLineError {
          __typename
          error {
            description
          }
        }
      }
    }
    insertOutboundShipments {
      id
      response {
        ... on InsertOutboundShipmentError {
          __typename
          error {
            description
          }
        }
        ... on NodeError {
          __typename
          error {
            description
            ... on RecordNotFound {
              __typename
              description
            }
            ... on DatabaseError {
              __typename
              description
              fullError
            }
          }
        }
      }
    }
    updateOutboundShipmentLines {
      id
      response {
        ... on UpdateOutboundShipmentLineError {
          __typename
          error {
            description
            ... on RecordNotFound {
              __typename
              description
            }
            ... on CannotEditInvoice {
              __typename
              description
            }
            ... on ForeignKeyError {
              __typename
              description
              key
            }
            ... on LocationIsOnHold {
              __typename
              description
            }
            ... on LocationNotFound {
              __typename
              description
            }
            ... on NotEnoughStockForReduction {
              __typename
              batch {
                ... on NodeError {
                  __typename
                  error {
                    description
                    ... on RecordNotFound {
                      __typename
                      description
                    }
                    ... on DatabaseError {
                      __typename
                      description
                      fullError
                    }
                  }
                }
              }
            }
            ... on StockLineAlreadyExistsInInvoice {
              __typename
              description
            }
            ... on StockLineIsOnHold {
              __typename
              description
            }
          }
        }
      }
    }
    updateOutboundShipmentServiceLines {
      id
      response {
        ... on UpdateOutboundShipmentServiceLineError {
          __typename
          error {
            description
            ... on RecordNotFound {
              __typename
              description
            }
            ... on CannotEditInvoice {
              __typename
              description
            }
            ... on ForeignKeyError {
              __typename
              description
              key
            }
          }
        }
      }
    }
    updateOutboundShipmentUnallocatedLines {
      id
      response {
        ... on UpdateOutboundShipmentUnallocatedLineError {
          __typename
          error {
            description
            ... on RecordNotFound {
              __typename
              description
            }
          }
        }
      }
    }
    updateOutboundShipments {
      id
      response {
        ... on UpdateOutboundShipmentError {
          __typename
          error {
            description
          }
        }
        ... on NodeError {
          __typename
          error {
            description
          }
        }
      }
    }
    allocateOutboundShipmentUnallocatedLines {
      id
      response {
        ... on AllocateOutboundShipmentUnallocatedLineError {
          __typename
          error {
            description
            ... on RecordNotFound {
              __typename
              description
            }
          }
        }
        ... on AllocateOutboundShipmentUnallocatedLineNode {
          __typename
          deletes {
            id
          }
          inserts {
            totalCount
          }
          updates {
            totalCount
          }
        }
      }
    }
  }
}`
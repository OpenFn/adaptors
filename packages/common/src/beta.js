import { asData } from './Adaptor'
/**
 * Scopes an array of data based on a JSONPath.
 * Useful when the source data has `n` items you would like to map to
 * an operation.
 * The operation will receive a slice of the data based of each item
 * of the JSONPath provided.
 *
 * It also ensures the results of an operation make their way back into
 * the state's references.
 * @public
 * @example
 *  each("$.[*]",
 *    create("SObject",
 *    field("FirstName", sourceValue("$.firstName")))
 *  )
 * @function
 * @param {DataSource} dataSource - JSONPath referencing a point in `state`.
 * @param {Operation} operation - The operation needed to be repeated.
 * @returns {Operation}
 */
export function each(dataSource, operation) {
  if (!dataSource) {
    throw new TypeError("dataSource argument for each operation is invalid.")
  }

  return (prevState) => {

    const items = asData(dataSource,prevState)
    const nextState = items.reduce(
      (state, data, index) => {
        if (state.then) {
          return state.then((state) => {
            return operation({ ...state, data, index })
          })
        } else {
          return operation({ ...state, data, index })
        }
      },
      prevState
    )

    // Ensure that the data this reducer was passed is returned to it's
    // original state. But allow any other changes to be kept.
    if (nextState.then) {
      return nextState.then((nextState) => ( { ...nextState, data: prevState.data } ))
    } else {
      return ( { ...nextState, data: prevState.data } );
    }

  }
}

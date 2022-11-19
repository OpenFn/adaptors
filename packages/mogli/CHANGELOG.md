v0.1.6
======

* State gets cleaned up after the operations are finished.
  This means that the final state is serializable.

  The JSForce connection object is provided by `createConnection`, and in turn
  `execute` ensures it is run before the user's operations.

  The `cleanupState` reducer simply deletes the connection key from state.

v0.1.3
======

* Bumped language-common dependency to v0.0.4.

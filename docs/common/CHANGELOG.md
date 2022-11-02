v0.4.0
======

Bumped all package versions to their latest.

v0.0.4
======

* Added `arrayToString` helper.  
  Allowing you to join an array of string'able primitives (strings and integers)
  into a string.
* Added `toArray` helper.  
  This can be used to coerce certain types of data into an array, this can be
  useful when the source data has an ambiguous format. For example a given
  key in the data may have an object as it's value (when there is only one item),
  and an array of objects when there is more than one. `toArray` can be used
  to reconcile this inconsistency.


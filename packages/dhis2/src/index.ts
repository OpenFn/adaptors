// Note that if we define types inline here, we get noise and warnings from
// typedoc in our unit tests (because of spurious "errors" in our jsdocs, including
// from imported files)
// Splitting the typedefs out into their own file makes testing a bit cleaner
import './types';

import * as Adaptor from './Adaptor';
export default Adaptor;

export * from './Adaptor';

export * as http from './http';
export * as util from './util';
export * as tracker from './tracker';
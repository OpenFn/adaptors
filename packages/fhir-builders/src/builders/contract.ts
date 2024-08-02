import { create } from '../builders';

import v5 from './v5/contract';
import v4 from './v4/contract';

// oh no, this makes typing evne more complicated
export default create('Contract', { '5': v5, '4': v4 });

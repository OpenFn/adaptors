
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const p = path.join('C:\\Users', 'test.js');
console.log('Path:', p);
console.log('URL toString:', pathToFileURL(p).toString());
console.log('URL href:', pathToFileURL(p).href);

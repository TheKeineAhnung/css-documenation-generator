import { generateCssDocs } from '../lib/cssDocumentationGenerator';
import { StatusObject } from '../lib/types/StatusObject';

const generator: StatusObject = generateCssDocs([''], '');

// eslint-disable-next-line no-console
console.log(generator);

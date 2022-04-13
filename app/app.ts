import { generateCssDocs } from '../lib/cssDocumentationGenerator';
import { StatusObject } from '../lib/types/StatusObject';

let generator: StatusObject = generateCssDocs([""], "");

console.log(generator);

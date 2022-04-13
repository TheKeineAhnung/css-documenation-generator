import { generateCssDocs } from '../src/cssDocumentationGenerator';
import { StatusObject } from '../src/types/StatusObject';

let generator: StatusObject = generateCssDocs([""], "");

console.log(generator);

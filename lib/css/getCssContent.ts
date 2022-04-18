import { readFileSync } from 'fs';

const getCssContent = function (cssFilePath: string): string {
  return readFileSync(cssFilePath, 'utf8');
};

export { getCssContent };

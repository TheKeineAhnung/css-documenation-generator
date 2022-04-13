import { readFileSync } from 'fs';

function getCSSContent(cssFilePath: string): string {
  return readFileSync(cssFilePath, "utf8");
}

export { getCSSContent };

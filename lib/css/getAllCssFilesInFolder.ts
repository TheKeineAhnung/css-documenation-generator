import { readdirSync } from 'fs';

const getAllCssFilesInFolder = function (
  input: string,
  fullPath = false
): string[] {
  let files: string[] = readdirSync(input);

  files = files.filter((file: string): boolean => file.endsWith('.css'));
  if (fullPath) {
    files.forEach((file: string): void => {
      files[files.indexOf(file)] = `${input}/${file}`;
    });
  }

  return files;
};

export { getAllCssFilesInFolder };

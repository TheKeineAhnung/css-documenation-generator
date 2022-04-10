import { readdirSync } from 'fs';

function getAllCssFilesInFolder(
  input: string,
  fullPath: boolean = false
): string[] {
  let files: string[] = readdirSync(input);
  files = files.filter((file) => file.endsWith(".css"));
  if (fullPath) {
    files.forEach((file) => {
      files[files.indexOf(file)] = `${input}/${file}`;
    });
  }
  return files;
}

export { getAllCssFilesInFolder };

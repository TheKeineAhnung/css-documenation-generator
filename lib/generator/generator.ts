import { generateMarkdown } from './content/generateMarkdown';
import { getAllCssFilesInFolder } from '../css/getAllCssFilesInFolder';
import { getCssContent } from '../css/getCssContent';
import { isValidGeneratorInput } from './isValidGeneratorInput';
import { isValidGeneratorOutput } from './isValidGeneratorOutput';
import { StatusObject } from '../types/StatusObject';
import { writeFile } from './writeFile';

const generateCssDocs = function generateCssDocs(
  inputPaths: string[],
  outputPath: string
): StatusObject {
  const returnObject: StatusObject = {
    status: 'success'
  };

  const validInput: StatusObject = isValidGeneratorInput(inputPaths);
  const validOutput: StatusObject = isValidGeneratorOutput(outputPath);

  if (validInput.status !== 'success') {
    return validInput;
  }

  if (validOutput.status !== 'success') {
    return validOutput;
  }

  const inputFiles: string[] = [];

  for (const inputPath of inputPaths) {
    const files: string[] = getAllCssFilesInFolder(inputPath, true);

    files.forEach((file: string): void => {
      inputFiles.push(file);
    });
  }

  const inputFilesWithoutPath: string[] = [];

  for (const inputPath of inputPaths) {
    const files: string[] = getAllCssFilesInFolder(inputPath, false);

    files.forEach((file: string): void => {
      inputFilesWithoutPath.push(file);
    });
  }

  const fileContents: string[] = [];

  for (const inputFile of inputFiles) {
    fileContents.push(getCssContent(inputFile));
  }

  let markdown = '';

  fileContents.forEach(
    (fileContent: string, index: number): StatusObject | void => {
      markdown = generateMarkdown(fileContent);
      const outputFile = `${outputPath}/${inputFilesWithoutPath[index].replace(
        '.css',
        '.md'
      )}`;
      const write = writeFile(outputFile, markdown);

      if (write.status !== 'success') {
        returnObject.status = 'error';
        returnObject.message = write.message;

        return returnObject;
      }
    }
  );

  return returnObject;
};

export { generateCssDocs };

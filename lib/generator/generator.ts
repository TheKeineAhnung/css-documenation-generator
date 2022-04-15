import { getAllCssFilesInFolder } from '../css/getAllCssFilesInFolder';
import { getCSSContent } from '../css/getCssContent';
import { StatusObject } from '../types/StatusObject';
import { generateMarkdown } from './content/generateMarkdown';
import { isValidGeneratorInput } from './isValidGeneratorInput';
import { isValidGeneratorOutput } from './isValidGeneratorOutput';
import { writeFile } from './writeFile';

function generateCssDocs(input: string[], output: string): StatusObject {
  let returnObject: StatusObject = {
    status: "success",
  };

  let validInput: StatusObject = isValidGeneratorInput(input);
  let validOutput: StatusObject = isValidGeneratorOutput(output);

  if (validInput.status !== "success") {
    return validInput;
  }

  if (validOutput.status !== "success") {
    return validOutput;
  }

  let inputFiles: string[] = [];

  for (let i: number = 0; i < input.length; i++) {
    let files: string[] = getAllCssFilesInFolder(input[i], true);
    files.forEach((file: string) => {
      inputFiles.push(file);
    });
  }

  let inputFilesWithoutPath: string[] = [];

  for (let i: number = 0; i < input.length; i++) {
    let files: string[] = getAllCssFilesInFolder(input[i], false);
    files.forEach((file: string) => {
      inputFilesWithoutPath.push(file);
    });
  }

  let fileContents: string[] = [];

  for (let i: number = 0; i < inputFiles.length; i++) {
    fileContents.push(getCSSContent(inputFiles[i]));
  }

  let markdown: string = "";

  fileContents.forEach((fileContent: string, index: number) => {
    markdown = generateMarkdown(fileContent);
    let outputFile: string =
      output + "/" + inputFilesWithoutPath[index].replace(".css", ".md");
    let write = writeFile(outputFile, markdown);
    if (write.status !== "success") {
      returnObject.status = "error";
      returnObject.message = write.message;
      return returnObject;
    }
  });

  return returnObject;
}

export { generateCssDocs };

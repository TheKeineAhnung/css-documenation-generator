import { writeFileSync } from 'fs';
import { statusObject } from 'types/statusObject';

function writeFile(filePath: string, content: string): statusObject {
  let returnObject: statusObject = {
    status: "success",
  };
  try {
    writeFileSync(filePath, content);
  } catch (error: unknown) {
    returnObject.status = "error";
    if (typeof error === "string") {
      returnObject.message = error;
    } else {
      returnObject.message =
        "An unknown error occurred while writing the markdown file(s).";
    }
  } finally {
    return returnObject;
  }
}

export { writeFile };

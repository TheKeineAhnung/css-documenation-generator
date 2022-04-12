import { writeFileSync } from 'fs';
import { StatusObject } from 'types/StatusObject';

function writeFile(filePath: string, content: string): StatusObject {
  let returnObject: StatusObject = {
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

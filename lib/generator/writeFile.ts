import { StatusObject } from '../types/StatusObject';
import { writeFileSync } from 'fs';

const writeFile = function writeFile(
  filePath: string,
  content: string
): StatusObject {
  const returnObject: StatusObject = {
    status: 'success'
  };

  try {
    writeFileSync(filePath, content);
  } catch (ex: unknown) {
    returnObject.status = 'error';
    if (typeof ex === 'string') {
      returnObject.message = ex;
    } else {
      returnObject.message =
        'An unknown error occurred while writing the markdown file(s).';
    }
  }

  return returnObject;
};

export { writeFile };

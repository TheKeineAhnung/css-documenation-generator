import { existsSync } from 'fs';

import { StatusObject } from '../types/StatusObject';

function isValidGeneratorInput(input: string[]): StatusObject {
  let returnObject: StatusObject = {
    status: "success",
  };

  if (input.length <= 0) {
    returnObject.status = "error";
    returnObject.message = "No input files were provided.";
    return returnObject;
  }

  for (let i: number = 0; i < input.length; i++) {
    if (!existsSync(input[i])) {
      returnObject.status = "error";
      returnObject.message = `'${input[i]}' does not exist`;
      return returnObject;
    }
  }

  return returnObject;
}

export { isValidGeneratorInput };

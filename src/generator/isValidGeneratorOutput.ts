import { existsSync } from 'fs';

import { statusObject } from '../messages/statusObject';

function isValidGeneratorOutput(output: string): statusObject {
  let returnObject: statusObject = {
    status: "success",
  };

  if (!existsSync(output)) {
    returnObject.status = "error";
    returnObject.message = `'${output}' does not exist`;
    return returnObject;
  }

  return returnObject;
}

export { isValidGeneratorOutput };

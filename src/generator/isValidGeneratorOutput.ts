import { existsSync } from 'fs';

import { StatusObject } from '../types/StatusObject';

function isValidGeneratorOutput(output: string): StatusObject {
  let returnObject: StatusObject = {
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

import { existsSync } from 'fs';

import { StatusObject } from '../types/StatusObject';

const isValidGeneratorOutput = function isValidGeneratorOutput (
  output: string
): StatusObject {
  const returnObject: StatusObject = {
    status: 'success'
  };

  if (!existsSync(output)) {
    returnObject.status = 'error';
    returnObject.message = `'${output}' does not exist`;

    return returnObject;
  }

  return returnObject;
};

export { isValidGeneratorOutput };

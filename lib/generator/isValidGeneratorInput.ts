import { existsSync } from 'fs';

import { StatusObject } from '../types/StatusObject';

const isValidGeneratorInput = function isValidGeneratorInput (
  input: string[]
): StatusObject {
  const returnObject: StatusObject = {
    status: 'success'
  };

  if (input.length <= 0) {
    returnObject.status = 'error';
    returnObject.message = 'No input files were provided.';

    return returnObject;
  }

  for (const element of input) {
    if (!existsSync(element)) {
      returnObject.status = 'error';
      returnObject.message = `'${element}' does not exist`;

      return returnObject;
    }
  }

  return returnObject;
};

export { isValidGeneratorInput };

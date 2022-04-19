import { assert } from 'assertthat';
import { dirname } from 'path';
import { isValidGeneratorInput } from '../../../lib/generator/isValidGeneratorInput';
import { StatusObject } from '../../../lib/types/StatusObject';

suite('isValidGeneratorInput', (): void => {
  suite('validInput', (): void => {
    test(`tests if the check for existing directory works correct.`, async (): Promise<void> => {
      const validDir = `${dirname(dirname(__dirname))}\\files\\`;
      const output: StatusObject = isValidGeneratorInput([`${validDir}`]);

      assert.that(output.status).is.equalTo('success');
    });
  });

  suite('invalidInput', (): void => {
    test(`tests when input array is empty.`, async (): Promise<void> => {
      const output: StatusObject = isValidGeneratorInput([]);

      assert.that(output.status).is.equalTo('error');
    });

    test(`tests when input array contains invalid directory.`, async (): Promise<void> => {
      const invalidDir = `${dirname(
        dirname(__dirname)
      )}\\files\\invalidDir\\test\\test`;
      const output: StatusObject = isValidGeneratorInput([`${invalidDir}`]);

      assert.that(output.status).is.equalTo('error');
    });
  });
});

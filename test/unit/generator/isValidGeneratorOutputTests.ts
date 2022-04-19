import { assert } from 'assertthat';
import { dirname } from 'path';
import { isValidGeneratorOutput } from '../../../lib/generator/isValidGeneratorOutput';
import { StatusObject } from '../../../lib/types/StatusObject';

suite('isValidGeneratorOutput', (): void => {
  suite('validOutput', (): void => {
    test(`tests if the check for existing directory works correct.`, async (): Promise<void> => {
      const validDir = `${dirname(dirname(__dirname))}\\files\\`;
      const output: StatusObject = isValidGeneratorOutput(validDir);

      assert.that(output.status).is.equalTo('success');
    });
  });

  suite('invalidOutput', (): void => {
    test(`tests when input string is empty.`, async (): Promise<void> => {
      const output: StatusObject = isValidGeneratorOutput('');

      assert.that(output.status).is.equalTo('error');
    });

    test(`tests when output string contains invalid directory.`, async (): Promise<void> => {
      const invalidDir = `${dirname(
        dirname(__dirname)
      )}\\files\\invalidDir\\test\\test`;
      const output: StatusObject = isValidGeneratorOutput(invalidDir);

      assert.that(output.status).is.equalTo('error');
    });
  });
});

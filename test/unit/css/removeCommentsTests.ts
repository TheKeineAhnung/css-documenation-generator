import { assert } from 'assertthat';
import { removeComments } from '../../../lib/css/removeComments';

suite('getPseudoElements', (): void => {
  const values = [
    {
      content: '/*testedich*/ \n .test { \n color: red;\n}',
      expected: ' \n .test { \n color: red;\n}'
    }
  ];

  for (const { content, expected } of values) {
    test(`tests if comments are removed from string.`, async (): Promise<void> => {
      assert.that(removeComments(content)).is.equalTo(expected);
    });
  }
});

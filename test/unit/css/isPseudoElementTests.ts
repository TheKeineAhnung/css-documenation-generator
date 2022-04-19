import { assert } from 'assertthat';
import { isPseudoElement } from '../../../lib/css/isPseudoElement';

suite('getPseudoElements', (): void => {
  const values = [
    { selector: '::after', expected: true },
    { selector: ':hover', expected: false }
  ];

  for (const { selector, expected } of values) {
    test(`tests if '${selector}' returns '${expected}'.`, async (): Promise<void> => {
      assert.that(isPseudoElement(selector)).is.equalTo(expected);
    });
  }
});

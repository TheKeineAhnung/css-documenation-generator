import { assert } from 'assertthat';
import { getSelectorType } from '../../../lib/css/getSelectorType';

suite('getPseudoElements', (): void => {
  const values = [
    { selector: '#id', expected: '#Id' },
    { selector: ' #id', expected: ' #Id' },
    { selector: '*', expected: '*Universal' },
    { selector: '[test]', expected: '[Attribute]' },
    { selector: ' [test]', expected: ' [Attribute]' },
    { selector: '@keyframes', expected: 'Animation ' },
    { selector: ':hover', expected: ':pseudo-class' },
    { selector: 'img', expected: 'Element' }
  ];

  for (const { selector, expected } of values) {
    test(`tests if '${selector}' returns '${expected}'.`, async (): Promise<void> => {
      assert.that(getSelectorType(selector)).is.equalTo(expected);
    });
  }
});

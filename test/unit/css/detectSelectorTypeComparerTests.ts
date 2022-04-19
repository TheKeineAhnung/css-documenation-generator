import { assert } from 'assertthat';
import { detectSelectorTypeComparer } from '../../../lib/css/detectSelectorTypeComparer';

suite('detectSelectorTypeComparer', (): void => {
  suite('validSelectors', (): void => {
    const values = [
      {
        selector: '.test > .test2',
        expected: '.Class > .Class',
        comparer: '>'
      },
      { selector: '.test * .test2', expected: false, comparer: 'invalid' }
    ];

    for (const { selector, expected, comparer } of values) {
      test(`tests if string contains ${comparer} selector comparer.`, async (): Promise<void> => {
        const output: string | false = detectSelectorTypeComparer(selector);

        assert.that(String(output)).is.equalTo(String(expected));
      });
    }
  });

  suite('invalidSelectors', (): void => {
    const values = [
      { selector: '.test * #test2', expected: false, comparer: '*' },
      { selector: '#test', expected: false, comparer: 'does not contain a' }
    ];

    for (const { selector, expected, comparer } of values) {
      test(`tests if string contains ${comparer} selector comparer.`, async (): Promise<void> => {
        const output: string | false = detectSelectorTypeComparer(selector);

        assert.that(String(output)).is.equalTo(String(expected));
      });
    }
  });
});

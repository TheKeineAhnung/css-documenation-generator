import { assert } from 'assertthat';
import { splitSelectors } from '../../../lib/css/splitSelectors';

suite('detectSelectorTypeComparer', (): void => {
  suite('validSelectors', (): void => {
    const values = [
      {
        selector: '.class#id:hover img',
        expected: ['.class', '#id:hover', ' img']
      },
      {
        selector: '.class #id:hover ~ img',
        expected: ['.class', ' #id:hover ~ img']
      }
    ];

    for (const { selector, expected } of values) {
      test(`tests if '${selector}' is splited like '${expected}'.`, async (): Promise<void> => {
        const output: string[] = splitSelectors(selector);

        assert.that(output).is.equalTo(expected);
      });
    }
  });
});

import { assert } from 'assertthat';
import { getPseudoElements } from '../../../lib/css/getPseudoElements';

suite('getPseudoElements', (): void => {
  test('returns an array with all pseudo elements.', async (): Promise<void> => {
    const pseudoElements: string[] = getPseudoElements();
    const expected: string[] = [
      'after',
      'before',
      'first-letter',
      'first-line',
      'selection'
    ];

    assert.that(pseudoElements).is.equalTo(expected);
  });
});

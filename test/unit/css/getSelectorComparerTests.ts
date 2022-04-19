import { assert } from 'assertthat';
import { getSelectorComparer } from '../../../lib/css/getSelectorComparer';

suite('getPseudoElements', (): void => {
  test('returns an array with all pseudo elements.', async (): Promise<void> => {
    const selectorComparer: string[] = getSelectorComparer();
    const expected: string[] = ['>', '~', '+'];

    assert.that(selectorComparer).is.equalTo(expected);
  });
});

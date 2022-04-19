import { assert } from 'assertthat';
import { dirname } from 'path';
import { getAllCssFilesInFolder } from '../../../lib/css/getAllCssFilesInFolder';

suite('getAllCssFilesInFolder', (): void => {
  test(`returns an array with all css files in selected folder.`, async (): Promise<void> => {
    const dir = `${dirname(dirname(__dirname))}\\files\\`;
    const files: string[] = getAllCssFilesInFolder(dir);
    const expected: string[] = [`test.css`];

    assert.that(files).is.equalTo(expected);
  });
});

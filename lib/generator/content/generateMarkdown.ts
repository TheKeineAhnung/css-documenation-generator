import { generateMarkdownContent } from './templates/generateMarkdownContent';
import { generateMarkdownHeading } from './templates/generateMarkdownHeading';
import { getSelectorType } from '../../css/getSelectorType';
import { optimizeSelectorArray } from './optimizeSelectorArray';
import { removeComments } from '../../css/removeComments';
import { splitSelectors } from '../../css/splitSelectors';

const generateMarkdown = function generateMarkdown(cssContent: string): string {
  let cssContentUse: string = cssContent;

  if (cssContentUse.includes('/*')) {
    cssContentUse = removeComments(cssContentUse);
  }

  let selectorParts: string[] = cssContentUse.split('}');
  let markdown = '';

  if (selectorParts[0] === '') {
    return 'We can not generate documentation for this file because it is empty.';
  }

  selectorParts = optimizeSelectorArray(selectorParts);

  const keyframeMerger: string[] = [];
  let skipNextCount = 0;

  for (let i = 0; i < selectorParts.length; i++) {
    const element: string = selectorParts[i];
    let count: number = i;

    if (element.trim().startsWith('@keyframes')) {
      while (
        !selectorParts[count].trim().startsWith('100%') &&
        !selectorParts[count].trim().startsWith('to')
      ) {
        count += 1;
        skipNextCount += 1;
      }
      let keyframe = '';
      let j = i;

      while (j !== count) {
        keyframe += selectorParts[j]
          .trim()
          .replace('\r\n', '')
          .replace('\n', '');
        j += 1;
      }
      keyframe += '}';
      keyframeMerger.push(keyframe);
    } else if (skipNextCount > 0) {
      skipNextCount -= 1;
    } else {
      keyframeMerger.push(element);
    }
  }
  keyframeMerger.forEach((keyframe: string, index: number): void => {
    if (keyframe.trim() === '' || keyframe.trim() === '}') {
      keyframeMerger.splice(index, 1);
    }
  });

  selectorParts = keyframeMerger;

  // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
  selectorParts.sort();

  selectorParts.forEach((selectorPart: string): void => {
    let selectorType = '';
    const selectorPartBackup: string = selectorPart;
    const selectors: string[] = splitSelectors(selectorPart);
    let skipNext = false;

    for (let i = 0; i < selectors.length; i++) {
      const currentSelector: string = selectors[i];
      const delimiter = /(?=:)/gu;
      const tokens: string[] = currentSelector.split(delimiter);

      tokens.forEach((token: string, index: number): void => {
        if (token === ':') {
          tokens.splice(index, 1);
        } else if (token === '') {
          tokens.splice(index, 1);
        }
      });
      for (let j = 0; j < tokens.length; j++) {
        if (tokens[j].startsWith('::')) {
          tokens[j] = tokens[j].replace('::', ':');
        }
      }
      for (const [j, token] of tokens.entries()) {
        if (getSelectorType(token).toLowerCase().trim() === 'animation') {
          selectorType += getSelectorType(token) + selectors[j + 1].trim();
          skipNext = true;
        } else if (skipNext) {
          skipNext = false;
        } else {
          selectorType += getSelectorType(token);
        }
      }
    }

    if (selectorPartBackup.split('{')[0].trim().startsWith('@keyframes')) {
      const cssStyles: string[] = selectorPartBackup.split('{');
      let content = '';

      for (let i = 1; i < cssStyles.length; i++) {
        content += cssStyles[i];
      }
      content = content.replace(/(})/gu, '');
      markdown +=
        generateMarkdownHeading(
          selectorType,
          selectorPartBackup.split('{')[0]
        ) +
        generateMarkdownContent(
          selectorType,
          selectorPartBackup.split('{')[0],
          content
        );
    } else {
      const cssStyles: string = selectorPartBackup
        .split('{')[1]
        .replace('}', '');

      markdown +=
        generateMarkdownHeading(
          selectorType,
          selectorPartBackup.split('{')[0]
        ) +
        generateMarkdownContent(
          selectorType,
          selectorPartBackup.split('{')[0],
          cssStyles
        );
    }
  });

  return markdown;
};

export { generateMarkdown };

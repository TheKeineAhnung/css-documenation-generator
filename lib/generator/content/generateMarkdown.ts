import { getSelectorType } from '../../css/getSelectorType';
import { removeComments } from '../../css/removeComments';
import { splitSelectors } from '../../css/splitSelectors';
import { optimizeSelectorArray } from './optimizeSelectorArray';
import { generateMarkdownContent } from './templates/generateMarkdownContent';
import { generateMarkdownHeading } from './templates/generateMarkdownHeading';

function generateMarkdown(cssContent: string): string {
  if (cssContent.includes("/*")) {
    cssContent = removeComments(cssContent);
  }

  let selectorParts: string[] = cssContent.split("}");
  let markdown: string = "";

  if (selectorParts[0] === "") {
    return "We can't generate documentation for this file because it is empty.";
  }

  selectorParts = optimizeSelectorArray(selectorParts);

  let keyframeMerger: string[] = [];
  let skipNextCount: number = 0;
  for (let i: number = 0; i < selectorParts.length; i++) {
    let element: string = selectorParts[i];
    let count: number = i;
    if (element.trim().startsWith("@keyframes")) {
      while (
        !selectorParts[count].trim().startsWith("100%") &&
        !selectorParts[count].trim().startsWith("to")
      ) {
        count++;
        skipNextCount++;
      }
      let keyframe: string = "";
      let j = i;
      while (j !== count) {
        keyframe += selectorParts[j]
          .trim()
          .replace("\r\n", "")
          .replace("\n", "");
        j++;
      }
      keyframe += "}";
      keyframeMerger.push(keyframe);
    } else {
      if (skipNextCount > 0) {
        skipNextCount--;
      } else {
        keyframeMerger.push(element);
      }
    }
  }
  keyframeMerger.forEach((keyframe: string, index: number) => {
    if (keyframe.trim() === "" || keyframe.trim() === "}") {
      keyframeMerger.splice(index, 1);
    }
  });
  selectorParts = keyframeMerger;
  selectorParts.sort();

  selectorParts.forEach((selectorPart: string) => {
    let selectorType: string = "";
    let selectorPartBackup: string = selectorPart;
    let selectors: string[] = splitSelectors(selectorPart);
    let skipNext: boolean = false;
    for (let i: number = 0; i < selectors.length; i++) {
      let currentSelector: string = selectors[i];
      let delimiter: RegExp = /(?=:)/g;
      let tokens: string[] = currentSelector.split(delimiter);
      tokens.forEach((token: string, index: number) => {
        if (token === ":") {
          tokens.splice(index, 1);
        } else if (token === "") {
          tokens.splice(index, 1);
        }
      });
      for (let j: number = 0; j < tokens.length; j++) {
        if (tokens[j].startsWith("::")) {
          tokens[j] = tokens[j].replace("::", ":");
        }
      }
      for (let i: number = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (getSelectorType(token).toLowerCase().trim() === "animation") {
          selectorType += getSelectorType(token) + selectors[i + 1].trim();
          skipNext = true;
        } else {
          if (skipNext) {
            skipNext = false;
          } else {
            selectorType += getSelectorType(token);
          }
        }
      }
    }

    if (selectorPartBackup.split("{")[0].trim().startsWith("@keyframes")) {
      let cssStyles: string[] = selectorPartBackup.split("{");
      let content: string = "";
      for (let i = 1; i < cssStyles.length; i++) {
        content += cssStyles[i];
      }
      content = content.replace(/(})/g, "");
      markdown +=
        generateMarkdownHeading(
          selectorType,
          selectorPartBackup.split("{")[0]
        ) +
        generateMarkdownContent(
          selectorType,
          selectorPartBackup.split("{")[0],
          content
        );
    } else {
      let cssStyles: string = selectorPartBackup.split("{")[1].replace("}", "");
      markdown +=
        generateMarkdownHeading(
          selectorType,
          selectorPartBackup.split("{")[0]
        ) +
        generateMarkdownContent(
          selectorType,
          selectorPartBackup.split("{")[0],
          cssStyles
        );
    }
  });

  return markdown;
}

export { generateMarkdown };

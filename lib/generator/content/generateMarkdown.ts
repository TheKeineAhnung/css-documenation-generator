import { getSelectorType } from '../../css/getSelectorType';
import { removeComments } from '../../css/removeComments';
import { splitSelectors } from '../../css/splitSelectors';
import { generateMarkdownContent } from './templates/generateMarkdownContent';
import { generateMarkdownHeading } from './templates/generateMarkdownHeading';

// TODO @TheKeineAhnung: add support for attribute selectors
// TODO @TheKeineAhnung: add support for keyframes

function generateMarkdown(cssContent: string): string {
  if (cssContent.includes("/*")) {
    cssContent = removeComments(cssContent);
  }

  let selectorParts: string[] = cssContent.split("}");
  let markdown: string = "";

  if (selectorParts[0] === "") {
    return "We can't generate documentation for this file because it is empty.";
  }

  selectorParts.forEach((selectorPart: string, index: number) => {
    if (
      selectorPart === "" ||
      selectorPart === "\r\n" ||
      selectorPart === "\n"
    ) {
      selectorParts.splice(index, 1);
    }
  });
  selectorParts.forEach((selectorPart: string, index: number) => {
    selectorPart += "}";
    selectorParts[index] = selectorPart;
  });
  selectorParts.sort();
  let selectorType: string = "";
  selectorParts.forEach((selectorPart: string) => {
    let selectors: string[] = splitSelectors(selectorPart);
    for (let i: number = 0; i < selectors.length; i++) {
      let currentSelector: string = selectors[i];
      let delimiter: RegExp = /(?=:)/g;
      let tokens: string[] = currentSelector.split(delimiter);
      tokens.forEach((token: string, index: number) => {
        if (token === ":") {
          tokens.splice(index, 1);
        }
      });
      for (let j: number = 0; j < tokens.length; j++) {
        if (tokens[j].startsWith("::")) {
          tokens[j] = tokens[j].replace("::", ":");
        }
        selectorType += getSelectorType(tokens[j]);
      }
    }
    let cssStyles: string = cssContent.split("{")[1].replace("}", "");
    markdown +=
      generateMarkdownHeading(selectorType, cssContent.split("{")[0]) +
      generateMarkdownContent(
        selectorType,
        cssContent.split("{")[0],
        cssStyles
      );
  });

  return markdown;
}

export { generateMarkdown };

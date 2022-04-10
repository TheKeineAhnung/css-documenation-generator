import { generateClassSelectorContent } from './generateClassSelectorContent';
import { generateElementSelectorContent } from './generateElementSelectorContent';
import { generateIdSelectorContent } from './generateIdSelectorContent';

function generateMarkdown(cssContent: string): string {
  let selectorParts: string[] = cssContent.split("}");
  let markdown: string = "";

  if (selectorParts[0] === "") {
    return "We can't generate documentation for this file because it is empty.";
  }

  selectorParts.forEach((selectorPart, index) => {
    if (
      selectorPart === "" ||
      selectorPart === "\r\n" ||
      selectorPart === "\n"
    ) {
      selectorParts.splice(index, 1);
    }
  });
  selectorParts.forEach((selectorPart, index) => {
    selectorPart += "}";
    selectorParts[index] = selectorPart;
  });
  for (let i: number = 0; i < selectorParts.length; i++) {
    if (selectorParts[i].trimStart().startsWith(".")) {
      markdown += generateClassSelectorContent(selectorParts[i].trim());
    } else if (selectorParts[i].trimStart().startsWith("#")) {
      markdown += generateIdSelectorContent(selectorParts[i].trim());
    } else {
      markdown += generateElementSelectorContent(selectorParts[i].trim());
    }
  }
  return markdown;
}

export { generateMarkdown };

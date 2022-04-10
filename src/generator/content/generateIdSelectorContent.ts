import { isPseudoElement } from './isPseudoElement';
import { generateMarkdownContent } from './templates/generateMarkdownContent';
import { generateMarkdownHeading } from './templates/generateMarkdownHeading';

function generateIdSelectorContent(content: string): string {
  let markdown: string = "";
  if (content.split("{")[0].includes(":")) {
    let pseudoElements: string[] = [];

    if (content.split("{")[0].split(":").indexOf("") > 0) {
      for (
        let i: number = 2;
        i < content.split("{")[0].split(":").length;
        i++
      ) {
        pseudoElements.push(content.split("{")[0].split(":")[i].trim());
      }
    } else {
      for (
        let i: number = 1;
        i < content.split("{")[0].split(":").length;
        i++
      ) {
        pseudoElements.push(content.split("{")[0].split(":")[i].trim());
      }
    }

    let pseudoElementsGeneralName: string = "Id";

    pseudoElements.forEach((pseudoElement) => {
      if (isPseudoElement(pseudoElement)) {
        pseudoElementsGeneralName += "::pseudo-element";
      } else {
        pseudoElementsGeneralName += ":pseudo-class";
      }
    });
    markdown += generateMarkdownHeading(
      pseudoElementsGeneralName,
      content.split("{")[0]
    );
    markdown += "\n";
    markdown += generateMarkdownContent(
      pseudoElementsGeneralName,
      content.split("{")[0],
      content.split("{")[1].trim().split("}")[0].trim()
    );
  } else {
    markdown += generateMarkdownHeading("Id", content.split("{")[0]);
    markdown += "\n";
    markdown += generateMarkdownContent(
      "Id",
      content.split("{")[0],
      content.split("{")[1].trim().split("}")[0].trim()
    );
  }

  markdown += "\n\n";
  return markdown;
}

export { generateIdSelectorContent };

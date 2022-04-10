import { getPseudoSelectors } from './getPseudoSelectors';
import { isPseudoElement } from './isPseudoElement';
import { generateMarkdownContent } from './templates/generateMarkdownContent';
import { generateMarkdownHeading } from './templates/generateMarkdownHeading';

function generateIdSelectorContent(content: string): string {
  let markdown: string = "";
  if (content.split("{")[0].includes(":")) {
    let pseudoElements: string[] = getPseudoSelectors(content);

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

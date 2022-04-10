import { generateMarkdownContent } from './templates/generateMarkdownContent';
import { generateMarkdownHeading } from './templates/generateMarkdownHeading';

function generateElementSelectorContent(content: string): string {
  let markdown: string = "";
  markdown += generateMarkdownHeading("Element", content.split("{")[0]);
  markdown += "\n\n";
  markdown += generateMarkdownContent(
    "Element",
    content.split("{")[0],
    content.split("{")[1].trim().split("}")[0].trim()
  );
  markdown += "\n\n";
  return markdown;
}

export { generateElementSelectorContent };

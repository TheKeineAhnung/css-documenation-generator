import { generateMarkdownContent } from './templates/generateMarkdownContent';
import { generateMarkdownHeading } from './templates/generateMarkdownHeading';

function generateIdSelectorContent(content: string): string {
  let markdown: string = "";
  markdown += generateMarkdownHeading("Id", content.split("{")[0]);
  markdown += "\n\n";
  markdown += generateMarkdownContent(
    "Id",
    content.split("{")[0],
    content.split("{")[1].trim().split("}")[0].trim()
  );
  markdown += "\n\n";
  return markdown;
}

export { generateIdSelectorContent };

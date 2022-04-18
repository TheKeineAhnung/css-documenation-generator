const generateMarkdownHeading = function generateMarkdownHeading (
  type: string,
  selector: string
): string {
  return `## \`${type.trim()}\`: \`${selector.trim()}\`: \n`;
};

export { generateMarkdownHeading };

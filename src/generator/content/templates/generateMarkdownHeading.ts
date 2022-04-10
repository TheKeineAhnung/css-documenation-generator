function generateMarkdownHeading(type: string, selector: string): string {
  return `## ${type}: ${selector} \n`;
}

export { generateMarkdownHeading };

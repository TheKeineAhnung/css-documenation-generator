function generateMarkdownHeading(type: string, selector: string): string {
  return `## ${type}: ${selector}`;
}

export { generateMarkdownHeading };

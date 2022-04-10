function generateMarkdownContent(
  type: string,
  selector: string,
  content: string
): string {
  return `The ${type.toLowerCase()} \`${selector.trim()}\` has the following properties: \n \`${content}\``;
}

export { generateMarkdownContent };

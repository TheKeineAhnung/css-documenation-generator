function generateMarkdownContent(
  type: string,
  selector: string,
  content: string
): string {
  let tokens: string[] = content.split(";");
  tokens.forEach((token: string, index: number) => {
    tokens[index] = token.trim();
  });
  tokens.forEach((token: string, index: number) => {
    if (token === "" || token === " " || token === "\r\n" || token === "\n") {
      tokens.splice(index, 1);
    }
  });
  let contentString: string = "";
  tokens.forEach((token: string) => {
    contentString += `- \`${token.trim()}\`\n`;
  });
  return `The \`${type.toLowerCase()}\` selector with the specified selectors \`${selector.trim()}\` has the following properties: \n\n${contentString}\n`;
}

export { generateMarkdownContent };

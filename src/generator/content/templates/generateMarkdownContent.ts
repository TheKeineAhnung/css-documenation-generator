function generateMarkdownContent(
  type: string,
  selector: string,
  content: string
): string {
  let tokens: string[] = content.split(";");
  tokens.forEach((token, index) => {
    if (token === "" || token === " ") {
      tokens.splice(index, 1);
    }
  });
  let contentString: string = "";
  tokens.forEach((token) => {
    contentString += `- \`${token.trim()}\`\n`;
  });
  return `The \`${type.toLowerCase()}\` selector with the specified selectors \`${selector.trim()}\` has the following properties: \n\n${contentString}`;
}

export { generateMarkdownContent };

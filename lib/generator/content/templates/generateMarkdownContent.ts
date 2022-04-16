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
  if (type.toLowerCase().trim().startsWith("animation")) {
    let contentString: string = "";
    tokens.forEach((token: string) => {
      token.split("\n").forEach((line: string) => {
        line.split("\r").forEach((line: string) => {
          line = line.trim();
          let start0To9: RegExp = new RegExp("^[0-9]");
          if (
            start0To9.test(line) ||
            line.toLowerCase().startsWith("from") ||
            line.toLowerCase().startsWith("to")
          ) {
            contentString += `- \`${line}\`:\n`;
          } else {
            contentString += `  - \`${line}\`\n`;
          }
        });
      });
    });
    return `The \`${type.toLowerCase()}\` selector with the specified selectors \`${selector.trim()}\` has the following properties: \n\n${contentString}\n`;
  } else {
    let contentString: string = "";
    tokens.forEach((token: string) => {
      contentString += `- \`${token.trim()}\`\n`;
    });
    return `The \`${type.toLowerCase()}\` selector with the specified selectors \`${selector.trim()}\` has the following properties: \n\n${contentString}\n`;
  }
}

export { generateMarkdownContent };

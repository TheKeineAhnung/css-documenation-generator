function generateAnimationMarkdownContent(
  type: string,
  selector: string,
  tokens: string[]
): string {
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
}

export { generateAnimationMarkdownContent };

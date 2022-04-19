const generateAnimationMarkdownContent =
  function generateAnimationMarkdownContent(
    type: string,
    selector: string,
    tokens: string[]
  ): string {
    let contentString = '';

    tokens.forEach((token: string): void => {
      token.split('\n').forEach((line: string): void => {
        line.split('\r').forEach((lineSub: string): void => {
          const lineSubEdit: string = lineSub.trim();
          const start0To9 = /^\d/u;

          if (
            start0To9.test(lineSubEdit) ||
            lineSubEdit.toLowerCase().startsWith('from') ||
            lineSubEdit.toLowerCase().startsWith('to')
          ) {
            contentString += `- \`${lineSubEdit}\`:\n`;
          } else {
            contentString += `  - \`${lineSubEdit}\`\n`;
          }
        });
      });
    });

    return `The \`${type.toLowerCase()}\` selector with the specified selectors \`${selector.trim()}\` has the following properties: \n\n${contentString}\n`;
  };

export { generateAnimationMarkdownContent };

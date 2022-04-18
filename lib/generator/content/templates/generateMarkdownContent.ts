import { generateAnimationMarkdownContent } from './generateAnimationMarkdownContent';

const generateMarkdownContent = function generateMarkdownContent(
  type: string,
  selector: string,
  content: string
): string {
  const tokens: string[] = content.split(';');

  tokens.forEach((token: string, index: number): void => {
    tokens[index] = token.trim();
  });
  tokens.forEach((token: string, index: number): void => {
    if (token === '' || token === ' ' || token === '\r\n' || token === '\n') {
      tokens.splice(index, 1);
    }
  });
  if (type.toLowerCase().trim().startsWith('animation')) {
    return generateAnimationMarkdownContent(type, selector, tokens);
  }
  let contentString = '';

  tokens.forEach((token: string): void => {
    contentString += `- \`${token.trim()}\`\n`;
  });

  return `The \`${type.toLowerCase()}\` selector with the specified selectors \`${selector.trim()}\` has the following properties: \n\n${contentString}\n`;
};

export { generateMarkdownContent };

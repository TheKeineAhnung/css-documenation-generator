function removeComments(content: string): string {
  content = content.trim();

  while (content.includes("/*")) {
    let searchContentStart: RegExp = /(\/\*)/;
    let searchContentEnd: RegExp = /(\*\/)/;
    let startSubstringPosition: number = content.search(searchContentStart);
    let startContent: string = content.substring(startSubstringPosition);
    let endSubstringPosition: number =
      startContent.search(searchContentEnd) + startSubstringPosition;
    let commentContent: string =
      content.substring(startSubstringPosition, endSubstringPosition) + "*/";
    content = content.replace(commentContent, "");
  }

  return content;
}

export { removeComments };

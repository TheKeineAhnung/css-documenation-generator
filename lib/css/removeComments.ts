const removeComments = function removeComments(content: string): string {
  let contentWork: string = content.trim();

  while (contentWork.includes('/*')) {
    const searchContentStart = /(\/\*)/u;
    const searchContentEnd = /(\*\/)/u;
    const startSubstringPosition: number =
      contentWork.search(searchContentStart);
    const startContent: string = contentWork.slice(
      Math.max(0, startSubstringPosition)
    );
    const endSubstringPosition: number =
      startContent.search(searchContentEnd) + startSubstringPosition;
    const commentContent = `${contentWork.slice(
      startSubstringPosition,
      endSubstringPosition
    )}*/`;

    contentWork = contentWork.replace(commentContent, '');
  }

  return contentWork;
};

export { removeComments };

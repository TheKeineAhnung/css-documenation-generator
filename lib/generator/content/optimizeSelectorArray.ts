const optimizeSelectorArray = function optimizeSelectorArray(
  selectorArray: string[]
): string[] {
  const selectorParts: string[] = selectorArray;

  selectorParts.forEach((selectorPart: string, index: number): void => {
    if (
      selectorPart === '' ||
      selectorPart === '\r\n' ||
      selectorPart === '\n'
    ) {
      selectorParts.splice(index, 1);
    }
  });
  selectorParts.forEach((selectorPart: string, index: number): void => {
    let selectorPartUse: string = selectorPart;

    selectorPartUse += '}';
    selectorParts[index] = selectorPartUse;
  });

  return selectorParts;
};

export { optimizeSelectorArray };

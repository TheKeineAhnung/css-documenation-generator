function optimizeSelectorArray(selectorArray: string[]): string[] {
  let selectorParts: string[] = selectorArray;
  selectorParts.forEach((selectorPart: string, index: number) => {
    if (
      selectorPart === "" ||
      selectorPart === "\r\n" ||
      selectorPart === "\n"
    ) {
      selectorParts.splice(index, 1);
    }
  });
  selectorParts.forEach((selectorPart: string, index: number) => {
    selectorPart += "}";
    selectorParts[index] = selectorPart;
  });
  return selectorParts;
}

export { optimizeSelectorArray };

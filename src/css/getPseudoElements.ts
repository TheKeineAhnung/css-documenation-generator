function getPseudoElements(): string[] {
  let pseudoElements: string[] = [
    "after",
    "before",
    "first-letter",
    "first-line",
    "selection",
  ];
  return pseudoElements;
}

export { getPseudoElements };

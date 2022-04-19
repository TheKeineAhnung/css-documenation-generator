const getPseudoElements = function getPseudoElements (): string[] {
  const pseudoElements: string[] = [
    'after',
    'before',
    'first-letter',
    'first-line',
    'selection'
  ];

  return pseudoElements;
};

export { getPseudoElements };

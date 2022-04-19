import { getPseudoElements } from './getPseudoElements';

const isPseudoElement = function isPseudoElement(
  pseudoElement: string
): boolean {
  const pseudoElements: string[] = getPseudoElements();
  let pseudoElementReplace: string = pseudoElement;

  while (pseudoElementReplace.includes(':')) {
    pseudoElementReplace = pseudoElementReplace.replace(':', '');
  }

  return pseudoElements.includes(pseudoElementReplace);
};

export { isPseudoElement };

import { getPseudoElements } from './getPseudoElements';

function isPseudoElement(pseudoElement: string): boolean {
  let pseudoElements: string[] = getPseudoElements();
  while (pseudoElement.includes(":")) {
    pseudoElement = pseudoElement.replace(":", "");
  }
  return pseudoElements.includes(pseudoElement);
}

export { isPseudoElement };

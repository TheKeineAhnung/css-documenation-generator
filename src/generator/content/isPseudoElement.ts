import { getPseudoElements } from '../../css/getPseudoElements';

function isPseudoElement(pseudoElement: string): boolean {
  let pseudoElements: string[] = getPseudoElements();
  if (pseudoElement.includes(":")) {
    pseudoElement.replaceAll(":", "");
  }
  if (pseudoElements.includes(pseudoElement)) {
    return true;
  } else {
    return false;
  }
}

export { isPseudoElement };

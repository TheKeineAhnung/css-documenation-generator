import { SelectorType } from '../types/SelectorType';
import { isPseudoElement } from './isPseudoElement';

function getSelectorType(selector: string): SelectorType {
  if (selector.startsWith(":")) {
    if (isPseudoElement(selector)) {
      return "::pseudo-element";
    } else {
      return ":pseudo-class";
    }
  } else if (selector.startsWith("#")) {
    return "Id";
  } else if (selector.startsWith(" #")) {
    return " Id";
  } else if (selector.startsWith(".")) {
    return "Class";
  } else if (selector.startsWith(" .")) {
    return " Class";
  } else if (selector === "*") {
    return "Universal";
  } else {
    if (selector.startsWith(" ")) {
      return " Element";
    } else {
      return "Element";
    }
  }
}

export { getSelectorType };

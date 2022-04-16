import { getSelectorComparer } from './getSelectorComparer';
import { isPseudoElement } from './isPseudoElement';

function getSelectorType(selector: string): string {
  let selectorComparer: string[] = getSelectorComparer();
  for (let i: number = 0; i < selectorComparer.length; i++) {
    if (selector.includes(selectorComparer[i])) {
      let selectorParts: string[] = selector.split(selectorComparer[i]);
      let partNames: string =
        getSelectorType(selectorParts[0]).trimEnd() +
        " " +
        selectorComparer[i] +
        getSelectorType(selectorParts[1]);
      return partNames;
    }
  }
  if (selector.startsWith(":")) {
    if (isPseudoElement(selector)) {
      return "::pseudo-element";
    } else {
      return ":pseudo-class";
    }
  } else if (selector.startsWith("#")) {
    return "#Id";
  } else if (selector.startsWith(" #")) {
    return " #Id";
  } else if (selector.startsWith(".")) {
    return ".Class";
  } else if (selector.startsWith(" .")) {
    return " .Class";
  } else if (selector === "*") {
    return "*Universal";
  } else if (selector.startsWith("[")) {
    return "[Attribute]";
  } else if (selector.startsWith(" [")) {
    return " [Attribute]";
  } else if (selector.startsWith("@")) {
    return "Animation ";
  } else {
    if (selector.startsWith(" ")) {
      return " Element";
    } else {
      return "Element";
    }
  }
}

export { getSelectorType };

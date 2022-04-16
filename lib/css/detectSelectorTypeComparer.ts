import { getSelectorComparer } from './getSelectorComparer';
import { getSelectorType } from './getSelectorType';

function detectSelectorTypeComparer(selector: string): string {
  let selectorComparer: string[] = getSelectorComparer();
  for (let i: number = 0; i < selectorComparer.length; i++) {
    if (selector.includes(selectorComparer[i])) {
      let selectorParts: string[] = selector.split(selectorComparer[i]);
      let partName: string =
        getSelectorType(selectorParts[0]).trimEnd() +
        " " +
        selectorComparer[i] +
        getSelectorType(selectorParts[1]);
      return partName;
    }
  }
  return "false";
}

export { detectSelectorTypeComparer };

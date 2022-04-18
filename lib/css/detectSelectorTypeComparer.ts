import { getSelectorComparer } from './getSelectorComparer';
import { getSelectorType } from './getSelectorType';

const detectSelectorTypeComparer = function (selector: string): string {
  const selectorComparer: string[] = getSelectorComparer();

  for (const element of selectorComparer) {
    if (selector.includes(element)) {
      const selectorParts: string[] = selector.split(element);
      const partName = `${getSelectorType(
        selectorParts[0]
      ).trimEnd()} ${element}${getSelectorType(selectorParts[1])}`;

      return partName;
    }
  }

  return 'false';
};

export { detectSelectorTypeComparer };

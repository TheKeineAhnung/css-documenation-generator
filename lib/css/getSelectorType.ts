import { detectSelectorTypeComparer } from './detectSelectorTypeComparer';
import { isPseudoElement } from './isPseudoElement';

const getSelectorType = function getSelectorType(selector: string): string {
  if (detectSelectorTypeComparer(selector) !== false) {
    const detector: string | false = detectSelectorTypeComparer(selector);

    if (detector !== false) {
      return detector;
    }
  }
  if (selector.startsWith(':')) {
    if (isPseudoElement(selector)) {
      return '::pseudo-element';
    }

    return ':pseudo-class';
  }
  if (selector.startsWith('#')) {
    return '#Id';
  }
  if (selector.startsWith(' #')) {
    return ' #Id';
  }
  if (selector.startsWith('.')) {
    return '.Class';
  }
  if (selector.startsWith(' .')) {
    return ' .Class';
  }
  if (selector === '*') {
    return '*Universal';
  }
  if (selector.startsWith('[')) {
    return '[Attribute]';
  }
  if (selector.startsWith(' [')) {
    return ' [Attribute]';
  }
  if (selector.startsWith('@')) {
    return 'Animation ';
  }
  if (selector.startsWith(' ')) {
    return ' Element';
  }

  return 'Element';
};

export { getSelectorType };

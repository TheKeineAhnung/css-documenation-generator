import { getSelectorComparer } from './getSelectorComparer';

const splitSelectors = function splitSelectors(selectors: string): string[] {
  const selectorsClassId: string[] = [];
  let selectorsAll: string[] = [];
  const selectorComparer: string[] = getSelectorComparer();

  const selectorsClass: string[] = selectors.split(' {')[0].split('.');

  if (selectorsClass[0] === '') {
    selectorsClass.splice(0, 1);
  }
  selectorsClass.forEach((element: string, index: number): void => {
    let editElement: string = element;

    if (index - 1 >= 0) {
      if (selectorsClass[index - 1].endsWith(' ')) {
        editElement = ` .${element}`;
      } else {
        editElement = `.${element}`;
      }
    } else if (selectors.startsWith('.')) {
      editElement = `.${element}`;
    }
    selectorsClass[index] = editElement;
  });
  selectorsClass.forEach((selector: string): void => {
    selector.split('#').forEach((element: string, index: number): void => {
      let editElement: string = element;

      if (index - 1 >= 0) {
        if (selector.split('#')[index - 1].endsWith(' ')) {
          if (!element.startsWith('.') && !element.startsWith(' .')) {
            editElement = ` #${element}`;
          }
        } else if (!element.startsWith('.') && !element.startsWith(' .')) {
          editElement = `#${element}`;
        }
      } else if (
        !element.startsWith('.') &&
        !element.startsWith(' .') &&
        selectors.startsWith('.') &&
        selectors.startsWith('#')
      ) {
        editElement = `#${element}`;
      }
      selectorsClassId.push(editElement);
    });
  });
  let skipNext = false;

  selectorsClassId.forEach((selector: string): void => {
    if (selector.startsWith(' #') || selector.startsWith(' .')) {
      const delimiter = /(?=\s)/gu;
      const tokens: string[] = selector.split(delimiter);

      tokens.forEach((token: string, index: number): void => {
        if (token === '' || token === ' ') {
          tokens.splice(index, 1);
        }
      });
      tokens.forEach((token: string): void => {
        selectorsAll.push(token.trimEnd());
      });
    } else {
      selectorsAll.push(selector.trimEnd());
    }
  });
  selectorsAll.forEach((selector: string, index: number): void => {
    if (selector === '') {
      selectorsAll.splice(index, 1);
    }
  });
  let mergedSelectors: string[] = [];
  const finalMergedSelectors: string[] = [];

  skipNext = false;
  for (let i = 0; i < selectorsAll.length; i++) {
    if (skipNext) {
      skipNext = false;
    } else if (selectorComparer.includes(selectorsAll[i].trim())) {
      mergedSelectors.push(
        selectorsAll[i - 1] + selectorsAll[i] + selectorsAll[i + 1]
      );
      skipNext = true;
    } else {
      mergedSelectors.push(selectorsAll[i]);
    }
  }
  mergedSelectors.forEach((selector: string, index: number): void => {
    if (
      selector.includes('>') ||
      selector.includes('+') ||
      selector.includes('~')
    ) {
      if (
        index - 1 >= 0 &&
        !mergedSelectors[index - 1].includes('>') &&
        !mergedSelectors[index - 1].includes('+') &&
        !mergedSelectors[index - 1].includes('~')
      ) {
        mergedSelectors.splice(index - 1, 1);
      }
    } else if (selector === ' ' || selector === '') {
      mergedSelectors.splice(index, 1);
    }
  });

  mergedSelectors.forEach((selector: string, index: number): void => {
    if (
      selector.endsWith('>') ||
      selector.endsWith('+') ||
      selector.endsWith('~')
    ) {
      mergedSelectors[index] += mergedSelectors[index + 1];
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete mergedSelectors[index + 1];
    }
  });

  const continueMerging: string[] = [];

  // Is required because array can contain deleted elements cause dynamic delete
  for (const elem of mergedSelectors) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (elem !== undefined) {
      continueMerging.push(elem);
    }
  }

  mergedSelectors = continueMerging;

  for (const element of mergedSelectors) {
    const splitedElement: string[] = element.split(' ');

    splitedElement.forEach((element2: string, index: number): void => {
      if (index !== 0) {
        splitedElement[index] = ` ${element2}`;
      }
    });
    splitedElement.forEach((element3: string, index: number): void => {
      if (element3 === '' || element3 === ' ') {
        splitedElement.splice(index, 1);
      }
    });
    const elementArray: string[] = [];
    const removeIndexes: number[] = [];
    let removeMinusCounter = 1;

    for (let j = 0; j < splitedElement.length; j++) {
      const splitedElementElement: string = splitedElement[j];

      if (selectorComparer.includes(splitedElementElement.trim())) {
        if (j - 1 >= 0) {
          elementArray.push(
            splitedElement[j - 1] +
              splitedElementElement +
              splitedElement[j + 1]
          );
          skipNext = true;
          removeIndexes.push(j - removeMinusCounter);
          removeMinusCounter += 1;
        }
      } else if (!skipNext) {
        elementArray.push(splitedElementElement);
      } else {
        skipNext = false;
      }
    }
    removeIndexes.forEach((removeIndex: number): void => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete elementArray[removeIndex];
    });
    elementArray.forEach((element2: string): void => {
      finalMergedSelectors.push(element2);
    });
  }
  selectorsAll = finalMergedSelectors;
  const merging: string[] = [];

  selectorsAll.forEach((selector: string): void => {
    if (selector.includes('[')) {
      const selectorAttribute: string[] = selector.split('[');

      for (let i = 0; i < selectorAttribute.length; i++) {
        if (selectorAttribute[i].endsWith(']')) {
          selectorAttribute[i] = `[${selectorAttribute[i]}`;
        }
      }
      selectorAttribute.forEach((element: string): void => {
        merging.push(element);
      });
    } else {
      merging.push(selector);
    }
  });
  selectorsAll = merging;

  return selectorsAll;
};

export { splitSelectors };

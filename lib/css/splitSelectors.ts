import { getSelectorComparer } from './getSelectorComparer';

function splitSelectors(selectors: string): string[] {
  let selectorsClassId: string[] = [];
  let selectorsAll: string[] = [];
  const selectorComparer: string[] = getSelectorComparer();

  let selectorsClass: string[] = selectors.split(" {")[0].split(".");
  if (selectorsClass[0] === "") {
    selectorsClass.splice(0, 1);
  }
  selectorsClass.forEach((element, index) => {
    if (index - 1 >= 0) {
      if (selectorsClass[index - 1].endsWith(" ")) {
        element = ` .${element}`;
      } else {
        element = `.${element}`;
      }
    } else {
      if (selectors.startsWith(".")) {
        element = `.${element}`;
      }
    }
    selectorsClass[index] = element;
  });
  selectorsClass.forEach((selector) => {
    selector.split("#").forEach((element, index) => {
      if (index - 1 >= 0) {
        if (selector.split("#")[index - 1].endsWith(" ")) {
          if (!element.startsWith(".") && !element.startsWith(" .")) {
            element = ` #${element}`;
          }
        } else {
          if (!element.startsWith(".") && !element.startsWith(" .")) {
            element = `#${element}`;
          }
        }
      } else {
        if (
          !element.startsWith(".") &&
          !element.startsWith(" .") &&
          selectors.startsWith(".") &&
          selectors.startsWith("#")
        ) {
          element = `#${element}`;
        }
      }
      selectorsClassId.push(element);
    });
  });
  let skipNext: boolean = false;
  selectorsClassId.forEach((selector) => {
    if (selector.startsWith(" #") || selector.startsWith(" .")) {
      let delimiter: RegExp = /(?=\s)/g;
      let tokens: string[] = selector.split(delimiter);
      tokens.forEach((token, index) => {
        if (token === "" || token === " ") {
          tokens.splice(index, 1);
        }
      });
      tokens.forEach((token) => {
        selectorsAll.push(token.trimEnd());
      });
    } else {
      selectorsAll.push(selector.trimEnd());
    }
  });
  selectorsAll.forEach((selector, index) => {
    if (selector === "") {
      selectorsAll.splice(index, 1);
    }
  });
  let mergedSelectors: string[] = [];
  let finalMergedSelectors: string[] = [];
  skipNext = false;
  for (let i: number = 0; i < selectorsAll.length; i++) {
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
  mergedSelectors.forEach((selector, index) => {
    if (
      selector.includes(">") ||
      selector.includes("+") ||
      selector.includes("~")
    ) {
      if (index - 1 >= 0) {
        if (
          !mergedSelectors[index - 1].includes(">") &&
          !mergedSelectors[index - 1].includes("+") &&
          !mergedSelectors[index - 1].includes("~")
        ) {
          mergedSelectors.splice(index - 1, 1);
        }
      }
    } else if (selector === " " || selector === "") {
      mergedSelectors.splice(index, 1);
    }
  });
  for (let i: number = 0; i < mergedSelectors.length; i++) {
    let element: string = mergedSelectors[i];
    let splitedElement: string[] = element.split(" ");
    splitedElement.forEach((element, index) => {
      if (index !== 0) {
        splitedElement[index] = ` ${element}`;
      }
    });
    splitedElement.forEach((element, index) => {
      if (element === "" || element === " ") {
        splitedElement.splice(index, 1);
      }
    });
    let elementArray: string[] = [];
    let removeIndexes: number[] = [];
    let removeMinusCounter: number = 1;
    for (let j: number = 0; j < splitedElement.length; j++) {
      let element: string = splitedElement[j];
      if (selectorComparer.includes(element.trim())) {
        if (j - 1 >= 0) {
          elementArray.push(
            splitedElement[j - 1] + element + splitedElement[j + 1]
          );
          skipNext = true;
          removeIndexes.push(j - removeMinusCounter);
          removeMinusCounter++;
        }
      } else if (!skipNext) {
        elementArray.push(element);
      } else {
        skipNext = false;
      }
    }
    removeIndexes.forEach((removeIndex) => {
      delete elementArray[removeIndex];
    });
    elementArray.forEach((element) => {
      finalMergedSelectors.push(element);
    });
  }

  selectorsAll = finalMergedSelectors;
  console.log(selectorsAll);
  return selectorsAll;
}

export { splitSelectors };

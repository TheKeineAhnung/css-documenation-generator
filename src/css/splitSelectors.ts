function splitSelectors(selectors: string): string[] {
  let selectorsClassId: string[] = [];
  let selectorsAll: string[] = [];

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
      selector.split(" ").forEach((element) => {
        selectorsAll.push(element.trimEnd());
      });
    }
  });

  selectorsAll.forEach((selector, index) => {
    if (selector === "") {
      selectorsAll.splice(index, 1);
    }
  });
  return selectorsAll;
}

export { splitSelectors };

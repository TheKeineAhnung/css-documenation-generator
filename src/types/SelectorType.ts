// create a type which contains all html selectors in css
type SelectorType =
  | "Element"
  | "Class"
  | "Id"
  | "Universal"
  | " Element"
  | " Class"
  | " Id"
  | "::pseudo-element"
  | ":pseudo-class";

export { SelectorType };

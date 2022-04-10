function getPseudoSelectors(content: string): string[] {
  let pseudoSelectors: string[] = [];

  if (content.split("{")[0].split(":").indexOf("") > 0) {
    for (let i: number = 2; i < content.split("{")[0].split(":").length; i++) {
      pseudoSelectors.push(content.split("{")[0].split(":")[i].trim());
    }
  } else {
    for (let i: number = 1; i < content.split("{")[0].split(":").length; i++) {
      pseudoSelectors.push(content.split("{")[0].split(":")[i].trim());
    }
  }

  return pseudoSelectors;
}

export { getPseudoSelectors };

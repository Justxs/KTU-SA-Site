const stringService = {
  transformTextToId(text : string) : string {
    const textWithDashes = text.replace(/\s+/g, '-');

    const cleanedText = textWithDashes.replace(/[^0-9a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ-]/g, '');
    return '#' + cleanedText;
  }
};

export default stringService;

const stringService = {
  transformTextToId(text: string): string {
    const textWithDashes = text.replaceAll(/\s+/g, '-');

    const cleanedText = textWithDashes.replaceAll(/[^0-9a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ-]/g, '');
    return `#${cleanedText}`;
  },
};

export default stringService;

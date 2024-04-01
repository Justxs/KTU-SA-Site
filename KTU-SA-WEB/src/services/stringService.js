const stringService ={
  transformTextToId(text){
    let textWithDashes = text.replace(/\s+/g, '-');

    let cleanedText = textWithDashes.replace(/[^0-9a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ-]/g, '');
    return cleanedText;
  },
};
export default stringService;
/**
 * This is the filter word function, this function will filter bad word from the content included in the json file.
 *
 * @param content The content to be filtered
 * @returns {string} The filtered content.
 */

const filterWord = (content: string): string => {
  const words: any = require("./badWords.json").data;
  let filteredContent: string = "";

  words.foreach((word: string, index: number): void => {
    if (content.toLowerCase().includes(word[index])) {
      filteredContent = content.replace(
        word[index],
        "*".repeat(word[index].length)
      );
    }
  });

  return filteredContent;
};

export default filterWord;

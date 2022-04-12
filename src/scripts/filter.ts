import Words from "./badwords";

/**
 * This is the filter function, this function will filter the content and return filtered content.
 *
 * @param text The text to be filtered.
 * @returns {string} The filtered text.
 */

const filter = (text: string): string => {
  Words.BAD_WORDS.forEach((word: string) => {
    if (text.toLowerCase().includes(word)) {
      text = text.toLowerCase().replace(word, "*".repeat(word.length));
    }
  });
  return text;
};

export default filter;

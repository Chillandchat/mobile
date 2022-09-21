import Words from "./badwords";

/**
 * This is the filter function, this function will filter the content and return filtered content.
 *
 * @param text The text to be filtered.
 * @returns {string} The filtered text.
 */

const filter = (text: string): string => {
  text = ` ${text} `;

  Words.BAD_WORDS.forEach((word: string) => {
    if (text.toLowerCase().includes(` ${word} `)) {
      text = text.toLowerCase().replaceAll(word, "*".repeat(word.length));
    }
  });

  text = text.slice(1);
  text = text.slice(0, text.length - 1);

  return text;
};

export default filter;

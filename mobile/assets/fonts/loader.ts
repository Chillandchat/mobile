import * as font from "expo-font";

/**
 * This function loads the fonts that are in the fonts directory.
 * Including:
 *  - Poppins
 *      - Regular
 *      - ExtraBold
 *      - Bold
 *      - Light
 *
 * @returns {Promise<void>} The type of contents that are returned from the function.
 * @license FONT_LICENSE.txt The license can be found in the same directory at: FONT_LICENSE.txt
 */

const loadFonts = async (): Promise<void> => {
  await font
    .loadAsync({
      poppinsBold: require("./Poppins-Bold.ttf"),
      poppins: require("./Poppins-Regular.ttf"),
      poppinsExtraBold: require("./Poppins-ExtraBold.ttf"),
      poppinsLight: require("./Poppins-Light.ttf"),
    })
    .catch((err: unknown): void => {
      throw new Error(`Error: ${err} \n   Error code: CC_ERROR_0015`);
    });
};

export default loadFonts;

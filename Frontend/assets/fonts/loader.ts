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
 * @font_license The license can be found in the same directory at: FONT_LICENSE.txt
 */

const loadFonts = async (): Promise<void> => {
  await font.loadAsync({
    poppinsBold: require("./Poppins-Bold.ttf"),
    poppins: require("./Poppins-Regular.ttf"),
    poppinsExtraBold: require("./Poppins-ExtraBold.ttf"),
    poppinsLight: require("./Poppins-Light.ttf"),
  });
};

export default loadFonts;

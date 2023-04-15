/**
 * This is the decide overlay function,
 * this function will decide if a color needs a dark or light overlay.
 *
 * Originally implemented and designed by @SudoPlz
 *
 * @see https://stackoverflow.com/users/1658268/sudoplz
 *
 * @param {string}} bgColor The background color.
 * @param {string}} lightColor The light overlay color.
 * @param {string}} darkColor The dark overlay color.
 * @returns {string}} The color it should be.
 */

const decideOverlay = (
  bgColor: string,
  lightColor: string,
  darkColor: string
): string => {
  const color: string =
    bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  const r: number = parseInt(color.substring(0, 2), 16);
  const g: number = parseInt(color.substring(2, 4), 16);
  const b: number = parseInt(color.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
};

export default decideOverlay;

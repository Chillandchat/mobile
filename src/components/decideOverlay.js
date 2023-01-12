/**
 * This is the decide overlay function,
 * this function will decide if a color needs a dark or light overlay.
 *
 * Originally implemented and designed by @SudoPlz
 *
 * @see https://stackoverflow.com/users/1658268/sudoplz
 *
 * @param {*} bgColor The background color.
 * @param {*} lightColor The light overlay color.
 * @param {*} darkColor The dark overlay color.
 * @returns {*} The color it should be.
 */

function decideOverlay(bgColor, lightColor, darkColor) {
  const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
}

export default decideOverlay;

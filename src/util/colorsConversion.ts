/**
 * Representation of color in HSL (hue, saturation, luminance) format.
 */
interface HslColor {
  hue: number;
  saturation: number;
  lightness: number;
}

/**
 * Converts hex color string to hsl object
 * @param color color string in hex representation
 */
export function hexToHsl(color: string): HslColor {
  const red = parseInt(color.substr(1, 2), 16) / 255;
  const green = parseInt(color.substr(3, 2), 16) / 255;
  const blue = parseInt(color.substr(5, 2), 16) / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  const delta = max - min;

  let hue = 0;
  if (delta === 0) {
    hue = 0;
  } else if (max === red) {
    hue = 60 * (((green - blue) / delta) % 6);
  } else if (max === green) {
    hue = 60 * ((green - blue) / delta + 2);
  } else if (max === blue) {
    hue = 60 * ((green - blue) / delta + 4);
  }

  const lightness = (max + min) / 2;
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return { hue, saturation, lightness };
}

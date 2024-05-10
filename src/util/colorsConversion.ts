// @ts-ignore
import * as hexToHsl from "hex-to-hsl";

/**
 * Representation of color in HSL (hue, saturation, luminance) format.
 */
interface HSLColor {
  hue: number;
  saturation: number;
  lightness: number;
}

export const createMonochromPallete = (baseColor: string, numberOfColors: number) => {
    const pallete: HSLColor[] = [];
    const hslColor = hexToHsl(baseColor);
    pallete.push({
      hue: hslColor[0],
      saturation: hslColor[1],
      lightness: hslColor[2],
    });

    // TODO: get this number dynamically from data
    for (let i = 1; i < numberOfColors; i++) {
      const lightness = Math.round(hslColor[2] + ((40 - hslColor[2]) / 3) * i);
      const newColor = {
        hue: hslColor[0],
        saturation: hslColor[1],
        lightness,
      };
      pallete.push(newColor);
    }
    return pallete;
  };

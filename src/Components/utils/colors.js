export const getRandomColor = () => rgbToHex({
  r: getRandomColorValue(),
  g: getRandomColorValue(),
  b: getRandomColorValue()
});


export const getRandomColorValue = () => Math.floor(Math.random() * Math.floor(256));

export const rgbToHex = ({r, g, b}) => `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

export const isHexValid = (hex) => !!hexToRgb(hex);

export const hexToRgb = (hex) => {
  /* https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const getTextColorVisibleOnBackground = (hex) => getTextColorByBackgroundLuminance(
  getLuminance(
    hexToRgb(hex)
  )
);

const getLuminance = ({r, g, b}) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

const getTextColorByBackgroundLuminance = (luminance) => luminance > 0.5 ? 'black' : 'white';

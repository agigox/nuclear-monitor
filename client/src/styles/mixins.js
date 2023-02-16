import theme from './theme';

export const heading = (fontFamily, fontSize, lineHeight, color) => {
  const setColor = color || theme.colors.blackColor;

  return `
      font-family: ${fontFamily};
      font-size: ${fontSize};
      line-height: ${lineHeight};
      color: ${setColor};
  `;
};

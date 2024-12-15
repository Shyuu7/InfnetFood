export const COLORS = {
  red: '#D61728',
  yellow: '#F2B603',
  goldenYellow: '#A87B03',
  darkRed: '#3E0102',
  darkGray: '#0C0C0D',
  white: '#ffffff',
};

export const getThemeColors = (isDark) => ({
  containerBg: isDark ? COLORS.darkGray : COLORS.white,
  textColor: isDark ? COLORS.white : COLORS.darkGray,
  accents: isDark ? COLORS.goldenYellow : COLORS.darkRed,
});
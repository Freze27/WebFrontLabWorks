export const BREAKPOINTS = {
  largeDevice: 1380,
  mediumLarge: 1200,
  medium: 1080,
  mediumSmall: 950,
  smallMedium: 873,
  small: 580,
  verySmall: 450,
  mini: 350,
};

export const QUERIES = {
  largeAndDown: `max-width: ${BREAKPOINTS.largeDevice}px`,
  mediumLargeAndDown: `max-width: ${BREAKPOINTS.mediumLarge}px`,
  mediumAndDown: `max-width: ${BREAKPOINTS.medium}px`,
  mediumSmallAndDown: `max-width: ${BREAKPOINTS.mediumSmall}px`,
  smallMediumAndDown: `max-width: ${BREAKPOINTS.smallMedium}px`,
  smallAndDown: `max-width: ${BREAKPOINTS.small}px`,
  verySmallAndDown: `max-width: ${BREAKPOINTS.verySmall}px`,
};


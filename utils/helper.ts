export const getRandomInt = (max) =>
  Math.floor(Math.random() * Math.floor(max));

export const getHslString = (h: number, s: number, l: number) => {
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const getHslBackgroundColor = (tint: number) => {
  return getHslString(tint, 100, 90);
};
export const getHslTextColor = (tint: number) => {
  return getHslString(tint, 100, 30);
};

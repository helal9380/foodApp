/** @format */

export const getImageUrl = (num) => {
  return new URL(`../assets/0${num}.jpg`, import.meta.url).href;
};

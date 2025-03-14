/** @format */

/** @format */

const getImageUrl = (num) => {
  return new URL(`../assets/0${num}.jpg`, import.meta.url).href;
};
const getCategoryImageUrl = (num) => {
  return new URL(`../assets/category/slide${num}.jpg`, import.meta.url).href;
};
const getStars = (rating) => {
  const fullStar = "⭐"; // Replace with <img src="full-star.png" /> for images
  const emptyStar = "☆";
  const maxStars = 5;

  return Array.from({ length: maxStars }, (_, i) =>
    i < rating ? fullStar : emptyStar
  ).join(" ");
};

export { getCategoryImageUrl, getImageUrl, getStars };

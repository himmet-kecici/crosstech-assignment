export const getFirstLetters = (fullName) => {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0] || "")
    .join("");
};

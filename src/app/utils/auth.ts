export const getLoggedUsers = () => {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith("user_"))
    .map((key) => JSON.parse(localStorage.getItem(key) || "{}"));
};

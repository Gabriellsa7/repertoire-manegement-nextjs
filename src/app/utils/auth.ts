export const getAllUsers = () => {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith("user_"))
    .map((key) => JSON.parse(localStorage.getItem(key) || "{}"));
};

export const getLoggedUser = () => {
  const loggedUser = localStorage.getItem("user_logged");
  return loggedUser ? JSON.parse(loggedUser) : null;
};

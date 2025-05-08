export const isLoggedIn = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};

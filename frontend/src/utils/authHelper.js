export const isLoggedIn = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};

// MAYBE REMOVE THIS FILE

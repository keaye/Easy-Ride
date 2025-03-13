export const getUsernameFromEmail = (email) => {
  if (!email) return "";
  return email.split("@")[0];
};
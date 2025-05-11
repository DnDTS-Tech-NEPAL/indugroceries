import { decodeURI } from "@/utils";

export const getTokenFromClient = () => {
  try {
    const cookie = document.cookie;
    const token = cookie.split("; ").reduce((acc, curr) => {
      if (curr.startsWith("token=")) {
        return curr.split("token=")[1];
      }

      return acc;
    }, "");

    return decodeURI(token);

    // eslint-disable-next-line
  } catch (e) {
    return "";
  }
};

export const removeTokenFromClient = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

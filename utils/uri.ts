export const decodeURI = (str: string) => {
  try {
    return decodeURIComponent(str);
    // eslint-disable-next-line
  } catch (e) {
    return str;
  }
};

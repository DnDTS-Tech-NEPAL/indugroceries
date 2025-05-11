// __mocks__/global.js
global.structuredClone = (v) => {
  try {
    return JSON.parse(JSON.stringify(v));
    // only disable for this 'e' of catch block
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return "{}";
  }
};

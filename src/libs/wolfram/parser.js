const replaceAll = (target, search, replacement) => {
  return target.replace(new RegExp(search, "g"), replacement);
};

export const JSONparser = (arrayString) => {
  let str = arrayString.substring(1, arrayString.length - 1);
  str = replaceAll(str, /\\\\/g, "<->");
  str = replaceAll(str, /\\/g, "");
  str = replaceAll(str, /<->/g, "\\\\");
  return JSON.parse(str);
};

export default { JSONparser };

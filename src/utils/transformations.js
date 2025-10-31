export const capitalize = (str) => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const formatPhoneNumber = (arr) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
  const str = arr.join("");
  let formattedStr = "";
  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0 && i !== 0) {
      formattedStr += "-";
    }
    formattedStr += str[i];
  }
  return formattedStr;
};

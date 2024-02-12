exports.statusName = {
  UNAUTHORIZED: "UNAUTHORIZED",
  DUPLICATED: "DUPLICATED",
  NOTFOUND: "NOTFOUND",
  INVALIDCREDENTIALS: "INVALIDCREDENTIALS",
  BADREQUEST: "BADREQUEST",
  INTERNALERROR: "INTERNALERROR",
  DONE: "DONE",
  CREATED: "CREATED",
  FORBIDDEN: "FORBIDDEN",
  NOTAUTHORIZED: "NOTAUTHORIZED",
};

exports.getErrorCode = (errorName) => {
  console.log(errorName);
  return errorType[errorName];
};

exports.unicodeToEmoji = (unicode) => {
  return String.fromCodePoint(parseInt(unicode, 16)); // Return Emoji
};
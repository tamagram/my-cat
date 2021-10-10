const fs = require("fs");

const COLOR = {
  black: "\u001b[30m",
  red: "\u001b[31m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  blue: "\u001b[34m",
  magenta: "\u001b[35m",
  cyan: "\u001b[36m",
  white: "\u001b[37m",

  reset: "\u001b[0m",
};

const BUCKET = {
  square: {
    left: "[",
    right: "]",
  },
  round: {
    left: "(",
    right: ")",
  },
  angle: {
    left: "<",
    right: ">",
  },
};

// TODO: ファイルの中身（テキスト）を取得する
exports.get_text_content = (path) => {
  let text = "";
  try {
    buf = fs.readFileSync(path);
    text = buf.toString();
  } catch (err) {
    console.error(err);
  }
  return text;
};

// TODO: テキストに色を付ける
exports.text_coloring = (color, text) => {
  return;
};

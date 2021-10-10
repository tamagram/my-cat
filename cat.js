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

const BRACKET = {
  square: {
    left: "[",
    right: "]",
  },
  curly: {
    left: "{",
    right: "}",
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
exports.text_coloring = (text) => {
  let color = COLOR.yellow;
  let outputs = [];
  for (let i = 0; i < text.length; ++i) {
    cur_char = text[i];
    if (
      cur_char == BRACKET.square.left ||
      cur_char == BRACKET.curly.left ||
      cur_char == BRACKET.round.left ||
      cur_char == BRACKET.angle.left
    ) {
      outputs.push(color + cur_char + COLOR.reset);
      switch (color) {
        case COLOR.yellow:
          color = COLOR.magenta;
          break;
        case COLOR.magenta:
          color = COLOR.cyan;
          break;
        case COLOR.cyan:
          color = COLOR.yellow;
          break;
      }
    } else if (
      cur_char == BRACKET.square.right ||
      cur_char == BRACKET.curly.right ||
      cur_char == BRACKET.round.right ||
      cur_char == BRACKET.angle.right
    ) {
      switch (color) {
        case COLOR.yellow:
          color = COLOR.cyan;
          break;
        case COLOR.magenta:
          color = COLOR.yellow;
          break;
        case COLOR.cyan:
          color = COLOR.magenta;
          break;
      }
      outputs.push(color + cur_char + COLOR.reset);
    } else {
      outputs.push(cur_char);
    }
  }
  return outputs;
};

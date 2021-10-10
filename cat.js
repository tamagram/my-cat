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

exports.text_coloring = (text) => {
  class Pallet {
    constructor() {
      this.color = COLOR.yellow;
    }
    next_color = () => {
      switch (this.color) {
        case COLOR.yellow:
          this.color = COLOR.magenta;
          break;
        case COLOR.magenta:
          this.color = COLOR.cyan;
          break;
        case COLOR.cyan:
          this.color = COLOR.yellow;
          break;
      }
    };
    prev_color = () => {
      switch (this.color) {
        case COLOR.yellow:
          this.color = COLOR.cyan;
          break;
        case COLOR.magenta:
          this.color = COLOR.yellow;
          break;
        case COLOR.cyan:
          this.color = COLOR.magenta;
          break;
      }
    };
  }

  let pallet = new Pallet();
  let outputs = [];
  for (let i = 0; i < text.length; ++i) {
    cur_char = text[i];
    switch (cur_char) {
      case BRACKET.square.left:
      case BRACKET.curly.left:
      case BRACKET.round.left:
      case BRACKET.angle.left:
        outputs.push(pallet.color + cur_char + COLOR.reset);
        pallet.next_color();
        break;
      case BRACKET.square.right:
      case BRACKET.curly.right:
      case BRACKET.round.right:
      case BRACKET.angle.right:
        pallet.prev_color();
        outputs.push(pallet.color + cur_char + COLOR.reset);
        break;
      default:
        outputs.push(cur_char);
    }
  }
  return outputs;
};

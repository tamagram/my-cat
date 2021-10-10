#! /usr/bin/env node
const cat = require("./cat");

const args = process.argv.slice(2);
const path = args[0];
if (path) {
  text = cat.get_text_content(path);
  cat.text_coloring(text).map((output) => {
    process.stdout.write(output);
  });
  console.log();
} else {
  console.error("Error: Please specify a path.");
}

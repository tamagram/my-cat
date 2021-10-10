const cat = require("./cat");

test("hoge.json内のテキスト取得", () => {
  want = `[
  {
    "hoge": "fuga"
  }
]`;
  path = "./hoge.json";
  got = cat.get_text_content(path);
  expect(got).toBe(want);
});

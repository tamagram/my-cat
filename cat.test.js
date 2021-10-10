const cat = require("./cat");

describe("test get_text_content", () => {
  test("hoge.json内のテキスト取得", () => {
    want = '[{"hoge": "fuga"}]';
    path = "./hoge.json";
    got = cat.get_text_content(path);
    expect(got).toBe(want);
  });
});

describe("test text_coloring", () => {
  test("bucketに当たる部分に制御文字を追加", () => {
    want = [
      "\x1B[33m[\x1B[0m",
      "\x1B[35m{\x1B[0m",
      "\x1B[36m<\x1B[0m",
      "\x1B[36m>\x1B[0m",
      "\x1B[35m}\x1B[0m",
      "\x1B[33m]\x1B[0m",
    ];
    text = "[{<>}]";
    got = cat.text_coloring(text);
    // console.log(got);
    expect(got).toStrictEqual(want);
  });
});

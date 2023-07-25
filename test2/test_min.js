const o = require("axios");
async function a() {
  try {
    let t = [
        "https://www.google.com",
        "https://www.naver.com",
        "https://www.daum.net",
      ],
      e = await Promise.all(t.map((t) => o.get(t)));
    e.forEach((e, a) => {
      let s = t[a];
      console.log(
        `Response from ${s}: Status ${e.status}, Data Length ${e.data.length}`
      );
    });
  } catch (a) {
    console.error("Error occurred:", a.message);
  }
}
a();

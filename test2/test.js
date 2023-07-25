// 필요한 모듈 불러오기
const axios = require("axios");

// 비동기 함수를 이용하여 웹 요청 보내기
async function send_web_request() {
  try {
    // 요청을 보낼 주소들
    const urls = [
      "https://www.google.com",
      "https://www.naver.com",
      "https://www.daum.net",
    ];

    // 비동기 요청들을 동시에 보내기 위해 Promise.all 사용
    const responses = await Promise.all(urls.map((url) => axios.get(url)));

    // 응답 데이터 출력
    responses.forEach((response, index) => {
      const url = urls[index];
      console.log(
        `Response from ${url}: Status ${response.status}, Data Length ${response.data.length}`
      );
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

// 함수 호출하여 웹 요청 보내기
send_web_request();

// 전체 코드에서 사용할 전역 변수를 선언해놓는 파일
// inject.js 에 의해 인젝션 됨

// const port = chrome.runtime.connect();
let user_id: any = null;
const current_url = window.location.toString();

function get_promise_from_event() {
  return new Promise((resolve, reject) => {
    window.addEventListener(
      "message",
      (event) => {
        // We only accept messages from ourselves
        if (event.source !== window) {
          return;
        }
        if (event.data.type && event.data.type === "FROM_PAGE") {
          // console.log("Content script received: " + event.data.text);
          resolve(JSON.parse(event.data.text).id); //id를 resolve 하도록 함
        }
      },
      false
    );
  });
}

// user_id가 준비될때까지 기다림
user_id = await get_promise_from_event();

const category_key: string = current_url + "/category_select_data/" + user_id;
const map_key: string = current_url + "/map_select_data/" + user_id;

export { category_key, map_key };

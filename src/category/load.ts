// 브라우저에 저장된 카테고리 데이터를 불러와서 DOM에 실제로 적용시키는 스크립트

// 어짜피 컨텐츠 스크립트 끼리는 변수, 함수가 공유되지 않으므로
// 타입 스크립트에서 중복 선언 오류를 지우도록 nameSpace를 지정함.
// 다만 inject를 이용해 넣는 map의 경우 inject로 여러개를 삽입하면 웹 사이트에서 같이 돌아가므로
// 변수명, 함수명이 겹칠 수 있어서 조심해야함.
namespace Load {
  const current_url = window.location.toString();
  const load_data = localStorage.getItem(current_url + "/category_select_data");

  if (load_data !== null) {
    const save_data = JSON.parse(load_data);
    for (const key in save_data) {
      const item = document.querySelector<HTMLElement>("#" + key);
      if (item === null)
        throw new Error("Cannot Find Category Item in WebSite");
      // 현재 hidden / visible 상황이 다를 경우 클릭 이벤트 발생 시킴
      if (!item.className.includes(save_data[key])) {
        item.click();
      }
    }

    const first_key = Object.keys(save_data)[0];
    const first_item = document.querySelector<HTMLElement>("#" + first_key);
    if (first_item === null)
      throw new Error("Cannot Find Category Item in WebSite");

    // 가끔 플리커링이 발생하기도 하니 혹시 모르니
    // 새로고침으로 목적으로 첫번째 요소 2번 클릭!
    setTimeout(() => {
      first_item.click();
    }, 100);
    setTimeout(() => {
      first_item.click();
    }, 100);
  } else {
    console.log("카테고리를 저장한 데이터가 없습니다.");
  }
}

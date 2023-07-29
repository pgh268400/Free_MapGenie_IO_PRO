// console.log(window.xxx);
// 컨텐츠 스크립트에 window.user 객체 전송 (여기서는 WINDOW에 접근 가능하지만 컨텐츠 스크립트에선 window에 접근 불능이기 때문.)
window.postMessage(
  { type: "FROM_PAGE", text: JSON.stringify((window as any).user) },
  "*"
);

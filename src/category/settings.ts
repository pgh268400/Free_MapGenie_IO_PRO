/*
  Settings 아래 텍스트들 전부 투명도 1로 변경. 어둡지 않게 함
  실제 목적은 PRO 일때만 사용가능한 Remember selected categories 텍스트를
  하얗게 해서 실제로 사용 가능한 것처럼 보이기 위해서 사용.
  참고로 클라이언트 단에서 카테고리 저장을 구현했으므로,
  서버에서 카테고리 저장을 하지 않아도 됨. + 맵 마킹도 마찬가지 (어짜피 서버단에서 막혀서 할수도 없고)
*/

namespace Settings {
  const remember_selected_categories = document.querySelector<HTMLElement>(
    ".custom-control-label span"
  );
  if (remember_selected_categories === null)
    throw new Error("there is no remember_selected_categories in website");

  remember_selected_categories.style.opacity = "1";

  /*
  색깔만 변경하는게 아닌 체크박스도 효과를 줌.
  Remember selected categories 체크박스 체크 상태로 변경
  사용 : MutationObserver 콜백 함수
  이유 : 그냥 체크박스 체크할려고 하니 체크박스 HTML 로딩전에 먼저 코드가 실행되어
  DOM 조작이 먹히지 않아 옵저버 패턴으로 변경함.
  */

  // 함수 선언식 (위에 즉시 실행함수 때문에 function 키워드가 2개 중첩 되는게 싫어서
  // 화살표 함수와 함수 선언식으로 작성함. function으로 작성해도 무방.)
  const handle_mutation = (mutations_list: any, observer: any) => {
    for (let mutation of mutations_list) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // 요소가 생성되었을 때 체크박스 값을 true로 변경
        const checkbox_element: any = document.getElementById(
          "remember-categories-checkbox"
        );
        checkbox_element.checked = true;
      }
    }
  };

  // MutationObserver 생성
  var target_node = document.querySelector("body") as HTMLElement; //body querySelector는 절대로 null이 아님 (제대로 된 사이트라면)
  var config = { childList: true, subtree: true };
  var observer = new MutationObserver(handle_mutation);

  // 감시 시작
  observer.observe(target_node, config);
}

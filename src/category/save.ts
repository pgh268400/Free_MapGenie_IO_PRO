// 옵저버를 추가하여 카테고리의 상태를 저장할 수 있도록 함.
// 카테고리가 클릭될때마다 그 값을 object로 담고 브라우저에 저장함.

namespace Save {
  const visible_text = "category-visible";
  const hidden_text = "category-hidden";

  const category_items = document.querySelectorAll(
    "#categories div.group-categories > div"
  );

  type CategoryVisibility = "category-visible" | "category-hidden";

  type CategorySaveObject = {
    [key: string]: CategoryVisibility;
  };

  const save_data: CategorySaveObject = {};

  category_items.forEach((element) => {
    // 처음 접속 시 모든 카테고리의 상태를 확인하고 save_data에 저장합니다.
    if (element.className.includes(visible_text))
      save_data[element.id] = visible_text;
    else if (element.className.includes(hidden_text))
      save_data[element.id] = hidden_text;

    // MutationObserver 생성 - Class 이름이 변경되는 것을 감시합니다.
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const target = mutation.target as HTMLElement;
          const current_class = target.classList.toString();

          // class 이름이 변경되었을 때 처리하는 로직
          if (current_class.includes(visible_text)) {
            save_data[target.id] = visible_text;
          } else if (current_class.includes(hidden_text)) {
            save_data[target.id] = hidden_text;
          }

          console.log("변경된 태그:", target);
          console.log("변경된 태그의 ID:", target.id);
          console.log("변경된 태그의 class 이름:", current_class);

          // 변경된 상태를 저장
          // mapGenie 에는 여러가지 맵이 있으므로 key는 구분할 수 있도록 게임의 이름(정확히는 현재 URL)을 사용
          console.log(save_data);

          const current_url = window.location.toString();
          localStorage.setItem(
            current_url + "/category_select_data",
            JSON.stringify(save_data)
          );
        }
      }
    });

    // 옵션 설정
    const config = { attributes: true, childList: false, subtree: false };

    // MutationObserver를 특정 DOM 요소에 연결
    observer.observe(element, config);
  });
}

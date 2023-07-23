/*
  해당 스크립트는 inject.js 가 HTML Body에 삽입하여 실행하므로
  manifest.json 에서 컨텐츠 스크립트로 등록할 필요 없음. 등록을 해서는 안됨.

  category 폴더에서 save - load 의 역할이 카테고리의 상태를 저장하고 불러오는 것이라면
  해당 스크립트에서는 맵의 상태를 저장하고 불러오는 역할을 함.
  역시 클라이언트 단에서 맵의 마커 상태를 저장함.

  Pro로 속이기 - 100개 이상 클릭해도 문제없도록 일단 설정
  이 값을 속이면 프로모드로 인식됨. - 물론 서버에선 100개 이상 클릭 시 오류를 응답함.
  - 그냥 단순히 클라이언트에서 100개 이상 클릭만 가능하도록 우선 수정하는것.
*/

const _window: any = window; //window 가 타입 정의 되어 있어서 any 타입으로 window를 사용할 수 있도록 _window 로 작성
// 어짜피 window의 경우 웹 사이트에서 동적으로 가져오는 변수라 정적 타입 지정 자체가 불가능.

_window.mapData.maxMarkedLocations = 99999;
_window.user.hasPro = true;

const current_url = window.location.toString();
const category_key = current_url + "/map_select_data/" + window.user.id;

const temp_load_data = localStorage.getItem(category_key);
if (temp_load_data !== null) {
  const parse_data = JSON.parse(temp_load_data);
  // view_found_locations Key가 없으면 기본값 True로 추가
  if (!"view_found_locations" in parse_data) {
    local_storage_update_item(category_key, "view_found_locations", true);
  }
}

//map_select_data 불러오기 (있는 경우만 DOM에 적용)

const load_data = localStorage.getItem(category_key);
if (load_data !== null) {
  const parse_data = JSON.parse(load_data);
  // window.user.locations = parse_data[0];
  _window.store.getState().user.foundLocations = parse_data.locations;
  _window.store.getState().user.foundLocationsCount = parse_data.count; // 마킹한 갯수를 마킹 key 참고하여 변수에 반영

  // console.log("FOUND : ", window.store.getState().user.foundLocations);
  // console.log("COUNT : ", window.store.getState().user.foundLocationsCount);
  //window.user.gameLocationsCount = Object.keys(parse_data[0]).length; // 마킹한 갯수를 마킹 key 참고하여 변수에 반영
  // console.log(parse_data);

  // Found location ON/OFF 기억
  // window.mapManager.setFoundLocationsShown(parse_data.view_found_locations);

  if (!parse_data.view_found_locations) {
    console.log("비활성화 됐음.");
    // document.querySelector("#toggle-found").classList.add("disabled");

    // 플리커링이 발생하므로 여러번 클릭하도록 한다.
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        document.querySelector("#toggle-found").click();
      }, 100);
    }
  }

  // locations 데이터를 실제로 반영
  for (const key in parse_data.locations) {
    // window.mapManager 라는 것은 map.js 에서 찾아낸 API.
    // map.js 코드는 리버스 엔지니어링을 계속해볼 가치가 있을듯
    _window.mapManager.setLocationFound(parseInt(key), true);
    // window.mapManager.markLocationAsFound(parseInt(key), true);
  }
} else {
  console.log("맵 마커를 저장한 데이터가 없습니다.");
}

/*
  HTTP 응답 데이터 변조
  (웹 요청시 사용하는 XMLHttpRequest 객체 안의 함수를 재정의해서 응답값을 변조함)
  변수를 조정하여 클라이언트에서 Pro 모드로 속이더라도 서버에선 100개 이상 클릭할 시
  오류를 응답하기 때문에 이를 문제 없는 응답으로 변조해야 클라이언트 단에서 문제가 발생하지 않고
  제대로 마커가 체크됨. 물론 서버에서 데이터 저장을 포기한 것이므로 역시 마커 데이터를 클라이언트 쪽에서
  잘 저장할 수 있도록 스크립트를 작성함.
*/

var _open = XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (method, URL) {
  var _onreadystatechange = this.onreadystatechange,
    _this = this;

  _this.onreadystatechange = function () {
    try {
      // For Debug
      console.log("Caught! :)", method, URL /*, _this.responseText*/);
      console.log(_this.readyState, _this.status);
    } catch (e) {}

    // catch only completed api requests
    if (
      _this.readyState === 4 &&
      (_this.status === 402 || _this.status === 204 || _this.status === 201) &&
      URL.includes("api")
    ) {
      try {
        //////////////////////////////////////
        // THIS IS ACTIONS FOR YOUR REQUEST //
        //             EXAMPLE:             //
        //////////////////////////////////////
        console.log("응답값 변조 시작");
        console.log(_this);

        const data = {};

        // rewrite responseText & status (속이기)
        Object.defineProperty(_this, "responseText", {
          value: JSON.stringify(data),
        });

        Object.defineProperty(_this, "status", {
          value: 201,
        });

        // locations에 실시간으로 반영
        const regex = /(\d+)$/; // 숫자를 찾는 정규표현식, (\d+)는 하나 이상의 숫자를 의미합니다.
        const matches = URL.match(regex); // 정규표현식에 맞는 부분을 찾아 배열로 반환합니다.

        if (matches) {
          const id = parseInt(matches[0], 10); // 배열의 첫 번째 요소(매치된 부분)를 정수로 변환합니다.
          console.log("id:", id);
          if (method === "DELETE") {
            delete window.store.getState().user.foundLocations[id];
          } else if (method === "PUT") {
            window.store.getState().user.foundLocations[id] = true;
          }
          console.log(window.store.getState().user.foundLocations);
        } else {
          console.log("id를 찾을 수 없습니다.");
        }

        let view_found_locations = true;
        const temp_load_data = localStorage.getItem(category_key);
        if (temp_load_data !== null) {
          const parse_data = JSON.parse(temp_load_data);
          if (!"view_found_locations" in parse_data) {
            view_found_locations = false;
          }
        }

        // 로컬 스토리지에 기록
        localStorage.setItem(
          category_key,
          JSON.stringify({
            locations: window.store.getState().user.foundLocations,
            count: window.store.getState().user.foundLocationsCount,
            view_found_locations: view_found_locations,
          })
        );

        /////////////// END //////////////////
      } catch (e) {}
    }
    // call original callback
    if (_onreadystatechange) _onreadystatechange.apply(this, arguments);
  };

  // detect any onreadystatechange changing
  Object.defineProperty(this, "onreadystatechange", {
    get: function () {
      return _onreadystatechange;
    },
    set: function (value) {
      _onreadystatechange = value;
    },
  });

  return _open.apply(_this, arguments);
};

// local_storage에 저장된 단일 Object에 대해
// Object 안에 값을 추가하는 함수
// 기존 localStorage 의 setItem 은 무조건 덮어쓰기로 진행되어
// 업데이트를 하려면 기존 값을 가져오고, 새로운 값을 추가(Update)한 뒤 다시 저장해야 함.
// 이것을 이 함수로 대체함.
function local_storage_update_item(
  storage_key: string,
  object_key: string,
  object_new_val: any
) {
  const load_data = localStorage.getItem(storage_key);
  if (load_data !== null) {
    const parse_data = JSON.parse(load_data);
    parse_data[object_key] = object_new_val;
    localStorage.setItem(storage_key, JSON.stringify(parse_data));
  }
}

// Found Locations 버튼이 눌릴때마다 Found Locations ON/OFF 기억 (class 명을 감시함)
(function () {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const target = mutation.target as HTMLElement;
        const current_class = target.classList.toString();

        // class 이름이 변경되었을 때 처리하는 로직
        if (current_class.includes("disabled")) {
          local_storage_update_item(
            category_key,
            "view_found_locations",
            false
          );
        } else {
          local_storage_update_item(category_key, "view_found_locations", true);
        }
      }
    }
  });

  // 옵션 설정
  const config = { attributes: true, childList: false, subtree: false };

  // MutationObserver를 특정 DOM 요소에 연결
  const element = document.querySelector("#toggle-found");
  if (element === null)
    throw new Error("Cannot Find Found Locations Button in WebSite");
  observer.observe(element, config);
})();

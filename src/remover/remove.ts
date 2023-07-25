// 맵에서 Pro 사라는 내용들 지우는 곳
// 지우는것 이외에도 Pro 메세지를 조금 변경하기도 할것

// Pro 업그레이드 버튼 삭제
document.querySelectorAll("#button-upgrade").forEach((element, idx) => {
  element.remove();
});

// Pro 문구 제거
const inset = document.querySelector(".inset") as HTMLElement;
if (inset === null) throw new Error("Cannot find inset element");
inset.textContent = "";
inset.style.margin = "0";

// 문구도 추가
const blobby = document.querySelector('#blobby-left div[class^="text-center"]');
if (blobby !== null) {
  blobby.textContent =
    "FreeGenie is activated You can use Pro features without restrictions :)";
}

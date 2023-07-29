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
export { local_storage_update_item };

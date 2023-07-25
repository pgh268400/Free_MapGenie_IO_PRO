// 사이트 번역 작업용

// const category_obj = {};

// const category_item = document.querySelectorAll(
//   "#categories .group-categories .category-item .title"
// );

// category_item.forEach((item) => {
//   const category_name = item.innerText;
//   category_obj[category_name] = "";
// });

// localStorage.setItem("save", JSON.stringify(category_obj))
// console.log(category_obj);

const category_table = {
  "DIVINE TOWER": "신수탑",
  "DRAGON SHRINE": "",
  DUNGEON: "던전",
  ELEVATOR: "리프트",
  EVERGAOL: "봉인감옥",
  "HIDDEN PASSAGE": "",
  "IMP SEAL STATUE": "",
  LANDMARK: "랜드마크",
  "LEGACY DUNGEON": "",
  "MARTYR EFFIGY": "",
  "MINOR ERDTREE": "",
  PORTAL: "전송문",
  "SITE OF GRACE": "",
  "SMITHING TABLE": "",
  "SPIRITSPRING JUMP": "",
  "STAKE OF MARIKA": "",
  "WANDERING MAUSOLEUM": "",
  "BELL BEARING": "",
  COOKBOOK: "",
  "GREAT RUNE": "거대한 룬",
  "KEY ITEM": "",
  "MAP FRAGMENT": "",
  "MEMORY STONE": "메모리 스톤",
  PAINTING: "그림",
  REMEMBRANCE: "",
  SPELLBOOK: "",
  "STONESWORD KEY": "석검열쇠",
  "TALISMAN POUCH": "부적주머니",
  TOOL: "",
  WHETBLADE: "",
  AMMUNITION: "",
  "CERULEAN SCARAB": "",
  CONSUMABLE: "",
  "CRIMSON SCARAB": "",
  "CRYSTAL TEAR": "",
  DEATHROOT: "",
  "DRAGON HEART": "",
  GESTURE: "",
  "GOLDEN RUNE": "",
  "GOLDEN SEED": "",
  ITEM: "",
  "LARVAL TEAR": "",
  "MULTIPLAYER ITEM": "",
  "RUNE ARC": "",
  "SACRED TEAR": "",
  "SPIRIT ASHES": "",
  ARMOR: "",
  "ASH OF WAR": "",
  INCANTATION: "",
  SHIELD: "",
  SORCERY: "",
  TALISMAN: "",
  WEAPON: "",
  CHARACTER: "",
  GHOST: "",
  MERCHANT: "",
  TRAINER: "",
  BOSS: "",
  "ELITE ENEMY": "",
  ENEMY: "",
  "GREAT BOSS": "",
  INVASION: "",
  "LEGENDARY BOSS": "",
  "ANCIENT SMITHING STONE": "",
  "CRAFTING MATERIAL": "",
  "GHOST GLOVEWORT": "",
  GLOVEWORT: "",
  "GREAT GLOVEWORT": "",
  "MIQUELLA'S LILY": "",
  "RUIN FRAGMENT": "",
  "SMITHING STONE": "",
  "TRINA'S LILLY": "",
  "BIRDSEYE TELESCOPE": "",
  "GUIDING STATUE": "",
  LORE: "",
  MISCELLANEOUS: "",
  PUZZLE: "",
  QUEST: "",
  "SUMMONING SIGIL": "",
};

const is_translate = false;

if (is_translate) {
  for (const [key, value] of Object.entries(category_table)) {
    // console.log(`${key}: ${value}`);
    const category_title_element = document.querySelectorAll(
      `#categories .group-categories .category-item .title`
    );

    if (category_title_element === null)
      throw new Error("Cannot find category_title element");

    if (value === "") continue;

    for (const element of category_title_element) {
      const _element = element as HTMLElement;
      if (
        _element.innerText.trim().toLowerCase() === key.trim().toLowerCase()
      ) {
        _element.innerText = value;
        break;
      }
    }
  }
}

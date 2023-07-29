type CategoryVisibility = "category-visible" | "category-hidden";

type CategorySaveObject = {
  [key: string]: CategoryVisibility;
};

export { CategoryVisibility, CategorySaveObject };

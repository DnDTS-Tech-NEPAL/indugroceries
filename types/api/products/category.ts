export type CategoryType = {
  name: string;
  parent_item_group: string;
  is_group: 1 | 0;
  children: CategoryType[];
};

export type CategoryAPIResponseType = {
  Data: CategoryType[];
};

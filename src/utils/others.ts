export const getNewOrderIndex = (index: number, items: any[]) => {
  const prev = items[index - 1]?.orderIndex || 0;
  const next = index !== items.length - 1 ? items[index + 1]?.orderIndex : prev * 2;
  const item = items[index];
  item.orderIndex = (prev + (next || 0)) / 2;
  return item;
};

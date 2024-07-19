import { TFunction } from "i18next";

export const getNewOrderIndex = (index: number, items: any[]) => {
  const prev = items[index - 1]?.orderIndex || 0;
  const next = index !== items.length - 1 ? items[index + 1]?.orderIndex : prev * 2;
  const item = items[index];
  item.orderIndex = (prev + (next || 0)) / 2;
  return item;
};

export function minSeconds(seconds: number, t: TFunction): string {
  const minute = 60;
  const hour = 3600;
  const day = 86400;
  const week = 604800;
  const month = 2592000; // Assuming a month has 30 days

  if (seconds < minute) {
    return `${seconds} ${t("sec")}`;
  } else if (seconds < hour) {
    const minutes = +(seconds / minute).toFixed(1); // one decimal place
    return `${minutes} ${t("min")}`;
  } else if (seconds < day) {
    const hours = +(seconds / hour).toFixed(1); // one decimal place
    return `${hours} ${t("hour")}`;
  } else if (seconds < week) {
    const days = +(seconds / day).toFixed(1); // one decimal place
    return `${days} ${t("day")}`;
  } else if (seconds < month) {
    const weeks = +(seconds / week).toFixed(1); // one decimal place
    return `${weeks} ${t("week")}`;
  } else {
    const months = +(seconds / month).toFixed(1); // one decimal place
    return `${months} ${t("month")}`;
  }
}

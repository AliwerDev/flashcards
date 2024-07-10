import { IUser } from "../types/user";

export const getFullName = (user: IUser) => {
  return `${user?.firstName || ""} ${user?.lastName || ""}`;
};

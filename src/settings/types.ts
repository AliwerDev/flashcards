export type SettingsStateType = {
  theme: "dark" | "light";
  sidebar_collapsed: boolean;
};

export type Theme = "dark" | "light";

export type UpdateState = {
  theme?: "dark" | "light";
  sidebar_collapsed?: boolean;
};

export type SettingsContextType = {
  sidebar_collapsed: boolean;
  theme: Theme;
  changeMode: (theme: Theme) => void;
  updateData: (data: UpdateState) => void;
};

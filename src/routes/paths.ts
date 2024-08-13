const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

export const paths = {
  // AUTH
  auth: {
    login: (lang: string) => `/${lang}/${ROOTS.AUTH}/login`,
    register: (lang: string) => `/${lang}/${ROOTS.AUTH}/register`,
  },
  // DASHBOARD
  dashboard: {
    root: (lang: string) => `/${lang}/${ROOTS.DASHBOARD}`,
    users: (lang: string) => `/${lang}/${ROOTS.DASHBOARD}/users`,
    cards: (lang: string, categoryId: string) => `/${lang}/${ROOTS.DASHBOARD}/${categoryId}/cards`,
    play: (lang: string, categoryId: string) => `/${lang}/${ROOTS.DASHBOARD}/${categoryId}/play`,
    main: (lang: string, categoryId: string) => `/${lang}/${ROOTS.DASHBOARD}/${categoryId}/main`,
    profile: (lang: string) => `/${lang}/${ROOTS.DASHBOARD}/profile`,
    settings: (lang: string) => `/${lang}/${ROOTS.DASHBOARD}/settings`,
  },
};

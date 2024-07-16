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
  },
};

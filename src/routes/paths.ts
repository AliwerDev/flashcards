const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

export const paths = {
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    about: `${ROOTS.DASHBOARD}/about`,
    faq: `${ROOTS.DASHBOARD}/faq`,
    project: {
      root: `${ROOTS.DASHBOARD}/project`,
      new: `${ROOTS.DASHBOARD}/project/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/project/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/project/${id}/edit`,
      post: {
        new: (projectId: string) => `${ROOTS.DASHBOARD}/project/${projectId}/post/new`,
        edit: (id: string, projectId: string) => `${ROOTS.DASHBOARD}/project/${projectId}/post/${id}/edit`,
        details: (id: string, projectId: string) => `${ROOTS.DASHBOARD}/project/${projectId}/post/${id}`,
      },
    },
    investors: {
      root: `${ROOTS.DASHBOARD}/investor`,
      details: (id: string) => `${ROOTS.DASHBOARD}/investor/${id}`,
    },
    document: {
      root: `${ROOTS.DASHBOARD}/document`,
    },
    message: {
      root: `${ROOTS.DASHBOARD}/message`,
      new: `${ROOTS.DASHBOARD}/message/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/message/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/message/${id}/edit`,
    },
    application: {
      root: `${ROOTS.DASHBOARD}/application`,
    },
    locationRequests: {
      root: `${ROOTS.DASHBOARD}/location-requests`,
    },
    settings: {
      root: `${ROOTS.DASHBOARD}/settings`,
    },
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
};

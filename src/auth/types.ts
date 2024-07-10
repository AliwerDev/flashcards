export type AuthUserType = null | Record<string, any>;

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type RegisterDataType = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
};

// ----------------------------------------------------------------------

export type JWTContextType = {
  user: AuthUserType;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;

  login: (data: LoginDataType) => Promise<void>;
  register: (data: RegisterDataType) => Promise<void>;
  logout: () => Promise<void>;
};

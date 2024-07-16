import { useMemo, useEffect, useReducer, useCallback } from "react";
import get from "lodash.get";
import axios, { endpoints } from "@/src/utils/axios";

import { AuthContext } from "./auth-context";
import { setStorage } from "./utils";
import { AuthUserType, AuthStateType, LoginDataType, RegisterDataType, ActionMapType } from "../types";
import { config } from "@/src/config";

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGIN_DATA = "LOGIN_DATA",
  CHECK_CODE = "CHECK_CODE",
  LOGOUT = "LOGOUT",
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
  status: "uninitialized",
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  switch (action.type) {
    case Types.INITIAL:
      return {
        loading: false,
        user: action.payload.user,
      };
    case Types.LOGIN:
    case Types.REGISTER:
      return {
        ...state,
        user: action.payload.user,
      };
    case Types.LOGOUT:
      return {
        ...state,
        status: "uninitialized",
        user: null,
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------

const STORAGE_KEY = config.storageKey.TOKEN;

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken) {
        setStorage(accessToken);
        const res = await axios.get(endpoints.user.me);

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...res.data,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      setStorage(null);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  // LOGIN
  const login = useCallback(async (data: LoginDataType) => {
    const res = await axios.post(endpoints.auth.login, data);

    const { token } = get(res, "data", {});
    setStorage(token);
    initialize();

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          accessToken: token,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (data: RegisterDataType) => {
    const res = await axios.post(endpoints.auth.register, data);

    const { token, user } = res.data;
    localStorage.setItem(STORAGE_KEY, token);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user: {
          ...user,
          accessToken: token,
        },
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setStorage(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";
  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

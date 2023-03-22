import { createContext, useReducer } from "react";

export const userContext = createContext();

const initialState = {
  user: {},
  isLogin: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: payload,
        isLogin: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
        isLogin: false,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={[state, dispatch]}>
      {children}
    </userContext.Provider>
  );
};

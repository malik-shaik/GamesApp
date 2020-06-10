import React, { createContext, useReducer } from "react";
import { reducer, userData } from "./reducer";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, dispatch] = useReducer(reducer, userData);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

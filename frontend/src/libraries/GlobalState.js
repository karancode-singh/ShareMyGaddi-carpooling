import React, { createContext, useState } from "react";
import configData from "../config.json";

const initialState = {
  // mapsKey: configData.MAPS_API_KEY,
  endPoint: configData.END_POINT
}

export const GlobalContext = createContext();

const GlobalState = ({children}) => {
  const [globalSate, setGlobalState] = useState(initialState);
  return (
    <GlobalContext.Provider value={[globalSate, setGlobalState]}>
      {children}
    </GlobalContext.Provider>
  )
}
export default GlobalState;
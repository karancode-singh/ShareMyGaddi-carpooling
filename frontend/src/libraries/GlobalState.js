import React, { createContext, useState } from "react";

const initialState = {
  // mapsKey: process.env.REACT_APP_MAPS_API_KEY,
  endPoint: process.env.REACT_APP_END_POINT
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
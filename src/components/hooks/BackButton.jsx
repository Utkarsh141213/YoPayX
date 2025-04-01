
import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const BackButtonContext = createContext();

export const useBackButton = () => {
  return useContext(BackButtonContext);
};

export const BackButtonProvider = ({ children }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <BackButtonContext.Provider value={{ goBack }}>
      {children}
    </BackButtonContext.Provider>
  );
};

export const BackButton = (props) => {
  const { goBack } = useContext(BackButtonContext);
  const baseClassName = "add-fund-home text-xl md:text-2xl rounded-full px-8 py-2 pb-3 text-green-600 bg-green-900/45 hover:bg-green-900/55 cursor-pointer";
  const combinedClassName = props.className ? `${baseClassName} ${props.className}` : baseClassName;

  return (
    <button
      onClick={goBack}
      style={props.style} // Apply styles passed as props
      className={combinedClassName}>
      &larr; Back
    </button>
  );
};

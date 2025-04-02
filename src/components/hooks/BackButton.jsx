import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css"; // Import the external CSS

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
  const baseClassName =  "add-fund-home text-xl md:text-2xl rounded-full px-6 hover:bg-green-900/55 cursor-pointer hover:scale-105 transition-transform flex items-center justify-center back-button"; // Flex for centering
  const combinedClassName = props.className ? `${baseClassName} ${props.className}` : baseClassName;

  return (
    <button
      onClick={goBack}
      style={props.style}
      className={combinedClassName}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 inline-block mr-2"
      >
        <path
          fillRule="evenodd"
          d="M11.788 5.212a.75.75 0 010 1.06l-6.252 6.252 6.252 6.252a.75.75 0 11-1.06 1.06l-7.312-7.312a.75.75 0 010-1.06l7.312-7.312a.75.75 0 011.06 0z"
          clipRule="evenodd"
        />
              </svg>

    </button>
  );
};

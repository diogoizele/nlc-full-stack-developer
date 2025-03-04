import { createGlobalStyle } from "styled-components";
import { alpha } from "../utils/alpha";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    
    outline-color: ${({ theme }) => theme.colors.primary};

    ::selection {
      background-color: ${({ theme }) => alpha(theme.colors.primary, 0.2)};
    }
  }

  body {
    font-family: "Montserrat", sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    font-size: 1rem;

  }
 
  #root {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  } 
`;

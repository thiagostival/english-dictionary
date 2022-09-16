import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    overflow: hidden;
  };

  #root {
    display: flex ;
    flex-direction:  column;
  }

  body {
    color: ${(props) => props.theme.colors.gray[700]};
    background: ${(props) => props.theme.colors.white[200]};
    -webkit-font-smoothing: antialiased;
  }

  :focus {
    outline: 0;
  }

  button {
    border: 0;
    background: none;

    cursor: pointer;

    &[disabled] {
      cursor: not-allowed;
      filter: brightness(0.9);

      &:active {
        box-shadow: none;
      };
    };
  };

  body,
  input,
  textarea,
  button {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    border: none;
  }
`;

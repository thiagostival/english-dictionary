import { css } from 'styled-components';

export const defaultTheme = {
  colors: {
    blue: {
      '50': '#e0f1ff',
      '100': '#a8d8ff',
      '200': '#7cc4ff',
      '300': '#6abcff',
      '500': '#209aff',
      '700': '#403cdc',
      '900': '#19193f',
    },
    green: {
      '700': '#229d5b',
    },
    red: {
      '200': '#f4b8b9',
      '300': '#db5d61',
      '500': '#d0383e',
    },
    yellow: {
      '400': '#ffeebf',
    },
    white: {
      '100': '#ffffff',
      '200': '#f7f7f7',
      '300': '#e9e9e9',
    },
    gray: {
      '300': '#a0a0ab',
      '400': '#9494a0',
      '500': '#565669',
      '600': '#333333',
      '700': '#2b2b2d',
    },
  },

  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },

  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
  },

  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
};

export const scrollBars = {
  medium: css`
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-button {
      width: 0px;
      height: 0px;
    }
    ::-webkit-scrollbar-thumb {
      background: #dddddd;
      border-radius: 50px;

      transition: background 0.2s ease-in-out;
      &:hover {
        background: #d1d1d1;
      }
    }
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50px;
    }
    ::-webkit-scrollbar-corner {
      background: transparent;
    }
  `,
};

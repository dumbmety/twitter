import { createGlobalStyle } from 'styled-components'
import theme from './ThemeStyles'

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    font: inherit;
    box-sizing: border-box;
    background: transparent;
  }

  body {
    color: ${props =>
      props.theme === 'dark' ? theme.dark.text1 : theme.light.text1};
    background: ${props =>
      props.theme === 'dark'
        ? theme.dark.backgroundPrimary
        : theme.light.backgroundPrimary};
    font-family: Inter, sans-serif;
  }

  a {
    color: inherit;
    display: inline-block;
    text-decoration: none;
  }

  ul,
  ol {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`

export default GlobalStyles

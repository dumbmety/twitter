import styled, { css } from 'styled-components'
import theme from '../../styles/ThemeStyles'

interface ITwitterBox {
  isActive?: boolean
  isDisabled?: boolean

  color?: 'red' | 'blue' | 'green'
  variant?: 'solid' | 'outline'

  children: any
  onClick?: () => void
}

export default function TwitterBox(props: ITwitterBox) {
  return (
    <Box
      variant={props.variant || 'solid'}
      color={props.color}
      isActive={props.isActive}
      isDisabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.children}
    </Box>
  )
}

const Box = styled.div<ITwitterBox>`
  padding: 0.5rem;
  border-radius: 0.5rem;
  position: relative;
  border: 1px solid transparent;
  transition: ${theme.transition.ease};
  background: ${props =>
    props.variant === 'solid' ? theme.dark.backgroundBox : 'transparent'};

  ${props =>
    props.variant === 'solid' &&
    `box-shadow: 0 6px 12px rgba(38, 46, 54, 0.2);`}

  ${props =>
    props.variant === 'outline' &&
    css`
      border-color: ${theme.dark.backgroundCard};

      &:hover {
        border-color: transparent;
        background: ${theme.dark.backgroundBox};
      }
    `}

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}

  ${props =>
    props.isActive &&
    css`
      color: ${theme.colors.blue} !important;

      svg {
        fill: ${theme.colors.blue} !important;
        color: ${theme.colors.blue} !important;
      }
    `};

  ${props =>
    props.color === 'red' &&
    css`
      &:hover {
        color: ${theme.dark.text1} !important;
        background: ${theme.colors.red};

        svg {
          fill: ${theme.dark.text1} !important;
        }
      }
    `}

  ${props =>
    props.color === 'green' &&
    css`
      &:hover {
        color: ${theme.dark.text1} !important;
        background: ${theme.colors.green};

        svg {
          fill: ${theme.dark.text1} !important;
        }
      }
    `}

  ${props =>
    props.color === 'blue' &&
    css`
      &:hover {
        color: ${theme.dark.text1} !important;
        background: ${theme.colors.blue};

        svg {
          fill: ${theme.dark.text1} !important;
        }
      }
    `}
`

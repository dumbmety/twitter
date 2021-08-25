import styled, { css } from 'styled-components'
import theme from '../../styles/ThemeStyles'

interface IButton {
  fluid?: boolean
  disabled?: boolean

  variant: 'solid' | 'outline' | 'ghost' | 'link'

  children: any
}

export default function TwitterButton(props: IButton) {
  return (
    <Button
      variant={props.variant}
      fluid={props.fluid}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  )
}

const Button = styled.button<IButton>`
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  border-radius: 99px;
  user-select: none;
  transition: ${theme.transition.ease};

  ${props => props.fluid && `width: 100%`};

  ${props =>
    props.variant === 'solid' &&
    css`
      color: ${theme.dark.text1};
      background: ${theme.dark.primary};

      &:hover {
        background: ${theme.dark.primaryHover};
      }

      &:active {
        background: ${theme.dark.primaryActive};
      }
    `}

  ${props =>
    props.disabled &&
    css`
      opacity: 0.75;
      pointer-events: none;
    `};
`

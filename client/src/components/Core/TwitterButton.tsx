import styled from 'styled-components'
import { getButtonColors } from '../../helpers/button-component'
import theme from '../../styles/ThemeStyles'

interface IButton {
  fluid?: boolean
  disabled?: boolean

  type?: 'submit' | 'button'
  variant: 'solid' | 'outline' | 'ghost' | 'link'

  children: any
}

type ButtonProps = {
  fluid?: boolean
  disabled?: boolean
  variant: 'solid' | 'outline' | 'ghost' | 'link'
  buttonColors: string[]
}

export default function TwitterButton(props: IButton) {
  const colors = getButtonColors(props.variant)

  return (
    <Button
      type={props.type || 'button'}
      variant={props.variant}
      fluid={props.fluid}
      disabled={props.disabled}
      buttonColors={colors || []}
    >
      {props.children}
    </Button>
  )
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  border-radius: 99px;
  user-select: none;
  transition: ${theme.transition.ease};

  border: 1px solid ${props => props.buttonColors[1]};
  color: ${props => props.buttonColors[0]};

  background: ${props =>
    props.variant === 'solid' ? `${props.buttonColors[1]}` : 'transparent'};

  &:hover {
    ${props =>
      props.variant === 'solid' && `background: ${props.buttonColors[2]}`};
    border-color: ${props => props.buttonColors[2]};
  }

  &:active {
    ${props =>
      props.variant === 'solid' && `background: ${props.buttonColors[3]}`};
    border-color: ${props => props.buttonColors[3]};
  }

  ${props => props.fluid && `width: 100%`};
  ${props => props.disabled && `opacity: 0.75; pointer-events: none;`};
`

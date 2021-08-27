import styled, { css } from 'styled-components'
import { Close } from 'react-ionicons'
import theme from '../../styles/ThemeStyles'

interface ITwitterFullscreen {
  isOpen: boolean
  type: 'cover' | 'profile'
  srcImg?: string
  altImg?: string
  onClose?: () => void
}

interface IWrapper {
  isOpen: boolean
}

interface IImage {
  imgType: 'cover' | 'profile'
}

export default function TwitterFullscreen(props: ITwitterFullscreen) {
  return (
    <Wrapper isOpen={props.isOpen}>
      <Overlay onClick={props.onClose} />
      <CloseButton onClick={props.onClose}>
        <Close color="#ffffff" />
      </CloseButton>
      <Image imgType={props.type} src={props.srcImg} alt={props.altImg} />
    </Wrapper>
  )
}

const Wrapper = styled.div<IWrapper>`
  position: fixed;
  inset: 0;
  opacity: 0;
  z-index: 99;
  visibility: hidden;
  background: rgba(0, 0, 0, 0.75);
  transition: ${theme.transition.ease};

  ${props =>
    props.isOpen &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  cursor: pointer;
`

const CloseButton = styled.button`
  position: fixed;
  top: 2rem;
  left: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: ${theme.transition.ease};
  background: rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  span {
    display: grid;
    place-items: center;
  }
`

const Image = styled.img<IImage>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${props => props.imgType === 'profile' && `border-radius: 50%`};

  ${props =>
    props.imgType === 'cover' &&
    css`
      height: 30rem;
    `}
`

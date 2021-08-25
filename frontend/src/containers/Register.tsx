import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import theme from '../styles/ThemeStyles'
import * as authService from '../services/auth'
import TwitterButton from '../components/Core/TwitterButton'
import TwitterContainer from '../components/Core/TwitterContainer'

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function registerUser(event: FormEvent) {
    event.preventDefault()

    setLoading(true)
    await authService.register({ name, email, password })
    setLoading(false)

    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <Wrapper>
      <Image>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 335 276"
          fill="#ffffff"
        >
          <path d="m302 70a195 195 0 0 1 -299 175 142 142 0 0 0 97 -30 70 70 0 0 1 -58 -47 70 70 0 0 0 31 -2 70 70 0 0 1 -57 -66 70 70 0 0 0 28 5 70 70 0 0 1 -18 -90 195 195 0 0 0 141 72 67 67 0 0 1 116 -62 117 117 0 0 0 43 -17 65 65 0 0 1 -31 38 117 117 0 0 0 39 -11 65 65 0 0 1 -32 35" />
        </svg>
      </Image>
      <Content>
        <TwitterContainer size="xs">
          <Title>Create an account</Title>
          <Form onSubmit={registerUser}>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormInput
                id="name"
                type="text"
                placeholder="e.g. John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Passowrd</FormLabel>
              <FormInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            <TwitterButton
              disabled={loading}
              variant="solid"
              children="Create"
            />
            <p>
              You have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </TwitterContainer>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const Image = styled.div`
  width: 50%;
  display: grid;
  place-items: center;
  background-image: url('/img/auth-bg.png');

  svg {
    width: 15rem;
  }
`

const Content = styled.div`
  width: 50%;
  padding: 5rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`

const Form = styled.form`
  gap: 1rem;
  display: grid;
  margin-top: 2rem;
  user-select: none;

  a {
    color: ${theme.colors.blue};
  }

  button {
    margin-top: 1rem;
  }
`

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FormLabel = styled.label``
const FormInput = styled.input`
  border: 1px solid ${theme.dark.backgroundBox};
  padding: 0.75rem 1rem;
  color: ${theme.dark.text1};
  background: transparent;
  border-radius: 0.5rem;
  transition: ${theme.transition.ease};

  &:focus {
    border-color: ${theme.colors.blue};
    box-shadow: 0 0 0 2px rgba(29, 162, 243, 0.5);
  }
`

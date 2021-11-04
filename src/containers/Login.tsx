import * as Yup from 'yup'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import * as authAction from '../store/actions/auth'
import { RootState } from '../store/state'
import theme from '../styles/ThemeStyles'
import TwitterButton from '../components/Common/TwitterButton'
import TwitterContainer from '../components/Common/TwitterContainer'

interface LoginFormValues {
  email: string
  password: string
  remberMe: boolean
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your email')
    .email('Your email is invalid'),
  password: Yup.string().min(8).required('Please enter your password')
})

export default function Login() {
  const dispatch = useDispatch()
  const authorize = useSelector((state: RootState) => state.authorize)

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    remberMe: false
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
          <Title>Login to Twitter</Title>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={values => {
              dispatch(
                authAction.loginUser({
                  email: values.email,
                  password: values.password
                })
              )
              window.location.reload()
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                  {errors.email && touched.email && (
                    <small>{errors.email}</small>
                  )}
                </div>
                <div>
                  <label htmlFor="password">Passowrd</label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                  />

                  {errors.password && touched.password && (
                    <small>{errors.password}</small>
                  )}
                </div>
                <div
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Field id="remberMe" name="remberMe" type="checkbox" />
                    <label htmlFor="remberMe">Remember me</label>
                  </div>
                  <Link to="/account/reset-password">Forgot password?</Link>
                </div>
                <TwitterButton
                  type="submit"
                  disabled={authorize?.loading}
                  variant="solid"
                  children="Login"
                />
                <p>
                  You don't have an account?{' '}
                  <Link to="/register">Create an account</Link>
                </p>
              </Form>
            )}
          </Formik>
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

  form {
    gap: 1rem;
    display: grid;
    margin-top: 2rem;
    user-select: none;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      input {
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
      }

      small {
        color: ${theme.colors.red};
        font-size: 0.8rem;
      }
    }

    a {
      color: ${theme.colors.blue};
    }

    button {
      margin-top: 1rem;
    }
  }
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`

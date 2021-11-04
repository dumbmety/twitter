import * as Yup from 'yup'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import * as profileAction from '../../store/actions/profile'
import useAuth from '../../hooks/useAuth'
import theme from '../../styles/ThemeStyles'
import TwitterButton from '../Common/TwitterButton'
import { RootState } from '../../store/state'
import TwitterSpinner from '../Common/TwitterSpinner'

const formSchema = Yup.object().shape({
  name: Yup.string().required('Please enter your name').max(50),
  bio: Yup.string().max(160),
  website: Yup.string().url('Website must be a valid URL').max(100),
  location: Yup.string().max(30)
})

export default function EditProfile() {
  const { user } = useAuth()
  const dispatch = useDispatch()

  const { loading } = useSelector((state: RootState) => state.profile)

  const initialValues = {
    name: user.name || '',
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || '',
    birthday: user.birthday || ''
  }

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={values => {
          dispatch(profileAction.updateUserProfile(user._id, values))
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="What's your name?"
              />
              {errors.name && touched.name && <small>{errors.name}</small>}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="bio">Bio</FormLabel>
              <Field
                as="textarea"
                id="bio"
                name="bio"
                type="text"
                placeholder="Short biography of you..."
              />
              {errors.bio && touched.bio && <small>{errors.bio}</small>}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Field
                id="location"
                name="location"
                type="text"
                placeholder="Where do you live?"
              />
              {errors.location && touched.location && (
                <small>{errors.location}</small>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="website">Website</FormLabel>
              <Field
                id="website"
                name="website"
                type="url"
                placeholder="What's your website address?"
              />
              {errors.website && touched.website && (
                <small>{errors.website}</small>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="birthday">Birthday</FormLabel>
              <Field
                id="birthday"
                name="birthday"
                type="date"
                placeholder="When were you born?"
              />
              {errors.birthday && touched.birthday && (
                <small>{errors.birthday}</small>
              )}
            </FormControl>

            <ButtonWrapper>
              {loading && <TwitterSpinner size={26} />}
              <TwitterButton
                disabled={loading}
                type="submit"
                variant="solid"
                children={loading ? '' : 'Save'}
              />
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0.5rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
      width: 100%;
      height: 100%;
      margin-left: auto;
      text-align: center;
    }
  }
`

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input,
  textarea {
    border: 1px solid ${theme.dark.backgroundCard};
    padding: 0.75rem 1rem;
    color: ${theme.dark.text1};
    background: ${theme.dark.backgroundCard};
    border-radius: 0.5rem;
    transition: ${theme.transition.ease};

    &:focus {
      border-color: ${theme.colors.blue};
      box-shadow: 0 0 0 2px rgba(29, 162, 243, 0.5);
    }
  }

  textarea {
    resize: vertical;
    height: 100px;
  }

  small {
    color: ${theme.colors.red};
    font-size: 0.8rem;
  }
`

const FormLabel = styled.label``

const ButtonWrapper = styled.div`
  width: 7rem;
  overflow: hidden;
  height: 44px;
  position: relative;
  margin-left: auto;
  border-radius: 99px;
`

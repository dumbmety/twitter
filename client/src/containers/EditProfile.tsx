import styled from 'styled-components'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import TwitterBox from '../components/Common/TwitterBox'
import TwitterContainer from '../components/Common/TwitterContainer'
import UserActions from '../components/Core/ProfileActions'

import * as profileAction from '../store/actions/profile'
import theme from '../styles/ThemeStyles'
import useAuth from '../hooks/useAuth'
import { Formik } from 'formik'

type Params = { username: string }

export default function EditProfile() {
  const dispatch = useDispatch()
  const params: Params = useParams()

  const { user } = useAuth()

  const initialValues = {
    name: user.name || '',
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || '',
    birthday: user.birthday || ''
  }

  useEffect(() => {
    dispatch(profileAction.getUserProfile(params.username))
  }, [dispatch, params.username])

  return (
    <Wrapper>
      <Cover hasCover={!!user.cover}>
        {user?.cover && (
          <img src={`/img/covers/${user?.cover}`} alt={`${user?.name} Cover`} />
        )}
      </Cover>
      <TwitterContainer size="md">
        <Content>
          <Group style={{ width: 320 }}>
            <TwitterBox>
              <Center>
                <Avatar>
                  <img
                    src={`/img/users/${user.image || 'not_found.jpg'}`}
                    alt={`${user.name} Cover`}
                  />
                </Avatar>
                <Username>@{user.username}</Username>
              </Center>
            </TwitterBox>
            <UserActions activeLink="edit" />
          </Group>
          <Group style={{ flex: '1' }}>
            <TwitterBox>
              <Formik initialValues={initialValues} onSubmit={() => {}}>
                {/* TODO: MAKE EDIT PROFILE FORM */}
              </Formik>
            </TwitterBox>
          </Group>
        </Content>
      </TwitterContainer>
    </Wrapper>
  )
}

type ICover = {
  hasCover?: boolean
}

const Wrapper = styled.div``

const Cover = styled.div<ICover>`
  width: 100%;
  height: 17rem;
  overflow: hidden;
  background: ${theme.colors.blue};

  ${props => props.hasCover && `cursor: pointer;`}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Content = styled.div`
  display: flex;
  gap: 1rem;
  transform: translateY(-3rem);
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0;
  gap: 1rem;
`

const Avatar = styled.div`
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Username = styled.p`
  text-align: center;
  font-size: 0.8rem;
  color: ${theme.dark.text2};
`

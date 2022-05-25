import styled from "styled-components"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Camera, CloseCircle } from "react-ionicons"

import EditProfileForm from "../components/Forms/EditProfileForm"
import TwitterBox from "../components/Common/TwitterBox"
import TwitterContainer from "../components/Common/TwitterContainer"
import UserActions from "../components/Core/ProfileActions"

import * as userService from "../services/user"
import * as profileAction from "../store/actions/profile"
import theme from "../styles/ThemeStyles"
import useAuth from "../hooks/useAuth"

export default function EditProfile() {
  const { user }: any = useAuth()
  const dispatch = useDispatch()
  const params: any = useParams()

  useEffect(() => {
    dispatch(profileAction.getUserProfile(params.username))
  }, [dispatch, params.username])

  return (
    <Wrapper>
      <Cover hasCover={!!user.cover}>
        <CoverOverlay />
        {user?.cover && (
          <img src={`/img/covers/${user?.cover}`} alt={`${user?.name} Cover`} />
        )}
        <CoverActions>
          <Camera />
          <CloseCircle
            onClick={async () => {
              if (!user.cover) return

              const res = await userService.removeCover(user?._id)
              if (res.success)
                dispatch(profileAction.getUserProfile(params.username))
            }}
          />
        </CoverActions>
      </Cover>
      <TwitterContainer size="md">
        <Content>
          <Group style={{ width: 320 }}>
            <TwitterBox>
              <Center>
                <Avatar>
                  <AvatarOverlay />
                  <img
                    src={`/img/users/${user.image || "not_found.jpg"}`}
                    alt={`${user.name} Cover`}
                  />
                  <Camera />
                </Avatar>
                <Username>@{user.username}</Username>
              </Center>
            </TwitterBox>
            <UserActions activeLink="edit" />
          </Group>
          <Group style={{ flex: "1" }}>
            <TwitterBox>
              <EditProfileForm />
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
  position: relative;
  background: ${theme.colors.blue};

  ${props => props.hasCover && `cursor: pointer;`}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const CoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
`

const CoverActions = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  gap: 1rem;
  transform: translate(-50%, -50%);

  span {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    transition: ${theme.transition.ease};

    svg {
      color: #ffffff;
      fill: #ffffff;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &:active {
      background: rgba(255, 255, 255, 0.2);
    }
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
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 0.25rem;
    border-radius: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: ${theme.transition.ease};

    svg {
      color: #ffffff;
      fill: #ffffff;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &:active {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`

const AvatarOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
`

const Username = styled.p`
  text-align: center;
  font-size: 0.8rem;
  color: ${theme.dark.text2};
`

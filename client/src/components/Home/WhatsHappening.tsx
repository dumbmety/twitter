import styled from "styled-components"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CalendarOutline, HappyOutline, ImageOutline } from "react-ionicons"

import * as authAction from "../../store/actions/auth"
import * as tweetService from "../../services/tweet"
import * as notificationService from "../../services/notification"

import { RootState } from "../../store/state"
import theme from "../../styles/ThemeStyles"
import TwitterBox from "../Common/TwitterBox"
import TwitterButton from "../Common/TwitterButton"

export default function WhatsHappening() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.authorize)

  const [text, setText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const createTweet = async () => {
    setText("")
    setLoading(true)

    const { tweet } = await tweetService.createTweet(text)
    await notificationService.addNotification(text, tweet._id)

    setLoading(false)
    dispatch(authAction.getHomeTweets())
  }

  return (
    <TwitterBox>
      <Wrapper>
        <Link to="/profile">
          <Profile
            src={`/img/users/${user.image || "not_found.jpg"}`}
            alt={user?.name}
          />
        </Link>
        <div>
          <TextArea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="What's happening?"
          />
          <Divider />
          <Footer>
            <Actions>
              <ImageOutline />
              <HappyOutline />
              <CalendarOutline />
            </Actions>
            <TwitterButton
              disabled={loading || text.length === 0}
              variant="solid"
              onClick={createTweet}
            >
              Tweet
            </TwitterButton>
          </Footer>
        </div>
      </Wrapper>
    </TwitterBox>
  )
}

const Wrapper = styled.div`
  gap: 1rem;
  display: flex;
  padding: 0.5rem;

  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

const Profile = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  transition: ${theme.transition.ease};

  &:hover {
    opacity: 0.75;
  }
`

const TextArea = styled.textarea`
  color: ${theme.dark.text1};
  width: 100%;
  min-height: 50px;
  margin-top: 0.5rem;
  background: transparent;
  resize: none;

  &::placeholder {
    color: ${theme.dark.text2};
  }
`

const Divider = styled.hr`
  border-top: 1px solid ${theme.dark.backgroundPrimary};
  margin: 0.5rem 0;
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    cursor: pointer;
    transition: ${theme.transition.ease};

    &:hover {
      opacity: 0.75;
    }
  }

  svg {
    fill: ${theme.dark.primary};
    color: ${theme.dark.primary};
  }
`

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Cog, EllipsisVertical } from 'react-ionicons'

import theme from '../../styles/ThemeStyles'
import TwitterBox from '../Common/TwitterBox'
import { trends_hashtags } from '../../constants/hashtags'

export default function TrendsForYou() {
  return (
    <Wrapper>
      <TwitterBox>
        <Header>
          <h2>Trends for you</h2>
          <Cog />
        </Header>
        <Hashtags>
          {trends_hashtags.map(hashtag => (
            <Hashtag key={hashtag.id}>
              <div>
                <span>#{hashtag.tag}</span>
                <span>{hashtag.count} tweeks</span>
              </div>
              <div>
                <EllipsisVertical />
              </div>
            </Hashtag>
          ))}
        </Hashtags>
        <Action>
          <Link to="/explore/trending">See all</Link>
        </Action>
      </TwitterBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & > div {
    padding: 1rem 0;
  }
`

const Header = styled.header`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.dark.backgroundPrimary};
  padding-bottom: 1rem;

  span {
    display: grid;
    place-items: center;
  }

  svg {
    fill: ${theme.dark.text2};
    color: ${theme.dark.text2};
  }
`

const Hashtags = styled.ul`
  margin-top: 0.5rem;
  user-select: none;
`

const Hashtag = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    opacity: 0.75;
  }

  div:first-child {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    span:last-child {
      font-size: 0.8rem;
      color: ${theme.dark.text2};
    }
  }

  div:last-child {
    span {
      display: grid;
      place-items: center;

      svg {
        fill: ${theme.dark.text2};
        color: ${theme.dark.text2};
      }
    }
  }
`

const Action = styled.div`
  padding: 1rem 1rem 0 1rem;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8rem;

  a {
    color: ${theme.dark.text2};
    transition: ${theme.transition.ease};

    &:hover {
      color: ${theme.dark.text1};
    }
  }
`

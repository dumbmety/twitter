import SimpleBar from "simplebar-react"
import { useEffect, Suspense } from "react"
import { useDispatch } from "react-redux"
import { SkeletonTheme } from "react-loading-skeleton"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import * as authAction from "../store/actions/auth"
import * as notificationsAction from "../store/actions/notifications"

import Layout from "../components/Common/Layout"
import routes from "../utils/routes"
import theme from "../styles/ThemeStyles"
import useAuth from "../hooks/useAuth"

import Login from "./Login"
import Register from "./Register"

export default function App() {
  const dispatch = useDispatch()
  const { loading, isLogin } = useAuth()

  useEffect(() => {
    dispatch(authAction.getUser())
    dispatch(authAction.getHomeTweets())
    dispatch(notificationsAction.getNotifications())
    // eslint-disable-next-line
  }, [])

  return (
    <SimpleBar style={{ height: "100vh" }}>
      <SkeletonTheme
        baseColor={theme.dark.backgroundBox}
        highlightColor={theme.dark.backgroundCard}
      >
        <BrowserRouter>
          <Suspense fallback="Loading...">
            <Routes>
              {loading ? (
                "Loading..."
              ) : isLogin ? (
                <Layout>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={<route.component />}
                    />
                  ))}
                </Layout>
              ) : (
                <>
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Login />} />
                </>
              )}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SkeletonTheme>
    </SimpleBar>
  )
}

import { useSelector } from "react-redux"
import { RootState } from "../store/state"

export default function useAuth() {
  const { authorize, notifications } = useSelector((state: RootState) => state)

  const unreadNotification = notifications.notifications?.filter(
    notification => !notification.read
  )

  return {
    loading: authorize.loading,
    user: authorize.user,
    isLogin: authorize.hasUser,
    notifications,
    unreadNotification,
  }
}

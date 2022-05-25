import useAppSelector from "./useAppSelector"

export default function useAuth() {
  const { loading, user, hasUser } = useAppSelector(state => state.authorize)
  const { notifications }: any = useAppSelector(state => state.notifications)

  const unreadNotification = notifications?.filter(
    (notification: any) => !notification.read
  )

  return {
    loading,
    user,
    isLogin: hasUser,
    notifications,
    unreadNotification,
  }
}

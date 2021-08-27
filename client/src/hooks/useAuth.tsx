import { useSelector } from 'react-redux'
import { RootState } from '../store/state'

export default function useAuth() {
  const authorize = useSelector((state: RootState) => state.authorize)

  return {
    loading: authorize.loading,
    user: authorize.user,
    isLogin: authorize.hasUser
  }
}

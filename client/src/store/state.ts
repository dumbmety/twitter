export interface RootState {
  authorize: {
    loading: boolean
    error: string
    hasUser: boolean
    user: {
      name: string
      email: string
      password: string
      username?: string
    }
  }

  login: {
    user: object
    error: string
    loading: boolean
  }
}

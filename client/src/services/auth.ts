import axios from '../config/axios'

interface IUserLogin {
  email: string
  password: string
}

interface IUserRegister {
  name: string
  username: string
  email: string
  password: string
}

export async function getLoggedInUser() {
  try {
    const { data } = await axios.get('/user')
    return data.user
      ? { success: true, user: data.user }
      : { success: false, message: data.message }
  } catch (err) {
    return err
  }
}

export async function login({ email, password }: IUserLogin) {
  const user = { email, password }

  try {
    const { data } = await axios.post('/login', user)

    return data.error
      ? { success: false, message: data.message }
      : { success: true, user: data.user }
  } catch (err) {
    return err
  }
}

export async function register({
  name,
  username,
  email,
  password
}: IUserRegister) {
  const user = { name, email, username, password }

  try {
    const { data } = await axios.post('/register', user)

    return data.error
      ? { success: false, message: data.message }
      : { success: true, user: data.user }
  } catch (err) {
    return err
  }
}

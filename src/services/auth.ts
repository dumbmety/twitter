import axios from "../config/axios"
import { IUser } from "../types/schemas"

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

export async function getLoggedInUser(): Promise<{
  success: boolean
  user?: IUser
  message?: any
}> {
  try {
    const { data } = await axios.get("/user")
    return data.user
      ? { success: true, user: data.user }
      : { success: false, message: data.message }
  } catch (err) {
    return { success: false, message: err }
  }
}

export async function login({ email, password }: IUserLogin) {
  const user = { email, password }

  try {
    const { data } = await axios.post("/login", user)

    return data.error
      ? { success: false, message: data.message }
      : { success: true, user: data.user }
  } catch (err) {
    return err
  }
}

export async function logout() {
  try {
    const { data } = await axios.post("/logout")

    return data.error
      ? { success: false, message: data.message }
      : { success: true }
  } catch (err) {
    return err
  }
}

export async function register({
  name,
  username,
  email,
  password,
}: IUserRegister) {
  const user = { name, email, username, password }

  try {
    const { data } = await axios.post("/register", user)

    return data.error
      ? { success: false, message: data.message }
      : { success: true, user: data.user }
  } catch (err) {
    return err
  }
}

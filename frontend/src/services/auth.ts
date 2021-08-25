import axios from '../config/axios'

interface IUserLogin {
  email: string
  password: string
}

interface IUserRegister {
  name: string
  email: string
  password: string
}

export async function getLoggedInUser() {
  try {
    const res = await axios.get('/user')
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

export async function login({ email, password }: IUserLogin) {
  const user = { email, password }

  try {
    const res = await axios.post('/login', user)
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

export async function register({ name, email, password }: IUserRegister) {
  const user = { name, email, password }

  try {
    const res = await axios.post('/register', user)
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

import axios from "axios"

const instance = axios.create({
  baseURL: "https://twitter-backend.iran.liara.run/api",
  withCredentials: true,
})

export default instance

import axios from "axios"

const service = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`
  })
  
  service.interceptors.request.use((config) =>{
    const storedToken = localStorage.getItem("authToken")
    config.headers = storedToken && { Authorization: `Bearer ${storedToken}`}
    return config;

})

const signupService = (user) => {
  return service.post("/signup", user)
}

const loginService = (user) => {
  return service.post("/login", user)
}

const verifyService = () => {
  return service.get("/verify")
}

export {
  signupService,
  loginService,
  verifyService
}

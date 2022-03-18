import axios from "axios"

const service = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/user`
  })
  
   service.interceptors.request.use((config) =>{
    const storedToken = localStorage.getItem("authToken")
    config.headers = storedToken && { Authorization: `Bearer ${storedToken}`}
    return config;

})
 
const getMyProfileService = () => {
    return service.get("/")
}

const getUpdateService = (updateProfile) => {
    return service.patch("/", updateProfile)
}


const deleteProfileService = () => {
    return service.delete("/")
}

const getOtherProfile = (id) => {
    return service.get(`/${id}`)
}




export {
    getMyProfileService,
    getUpdateService,
    deleteProfileService,
    getOtherProfile
}
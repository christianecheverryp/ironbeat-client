import axios from "axios"

const service = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/upload`
  })
  
   service.interceptors.request.use((config) =>{
    const storedToken = localStorage.getItem("authToken")
    config.headers = storedToken && { Authorization: `Bearer ${storedToken}`}
    return config;

})
 
const uploadImageService = (imageFile) => {
    return service.post("/", imageFile)
}




export {
    uploadImageService,

}
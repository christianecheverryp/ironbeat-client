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

const uploadSongService = (audioFile) => {
    return service.post("/audio", audioFile)
}

const uploadAlbumImgService = (albumImgFile) => {
    return service.post("/img-album", albumImgFile)
}




export {
    uploadImageService,
    uploadSongService,
    uploadAlbumImgService

}
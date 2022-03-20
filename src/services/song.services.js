import axios from "axios"

const service = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/song`
  })
  
   service.interceptors.request.use((config) =>{
    const storedToken = localStorage.getItem("authToken")
    config.headers = storedToken && { Authorization: `Bearer ${storedToken}`}
    return config;

})

const addSongService = (songFile) => {
    return service.post("/", songFile)
}

const getSongDetailsService = (id) => {
    return service.get(`/${id}/details`)
}


const getAllMusicService = () => {
    return service.get("/")
}


export {
    addSongService,
    getSongDetailsService,
    getAllMusicService
}
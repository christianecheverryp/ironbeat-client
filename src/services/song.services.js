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


const getAllMusicService = (page) => {
    return service.get(`/all-music/${page}`)
}
const getSongPlaysService = (id) => {
    return service.patch("/plays", {id})
}


const getMySongsService = () => {
    return service.get("/my-songs")
}

const getOwnerSongsService = (id) => {
    return service.get(`/${id}/songs-list`)
}

const getRankingPlaysService = () => {
    return service.get("/ranking-plays")
}


export {
    addSongService,
    getSongDetailsService,
    getAllMusicService,
    getSongPlaysService,
    getMySongsService,
    getOwnerSongsService,
    getRankingPlaysService

}
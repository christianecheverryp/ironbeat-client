import axios from "axios"

const service = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/playlist`
  })
  
   service.interceptors.request.use((config) =>{
    const storedToken = localStorage.getItem("authToken")
    config.headers = storedToken && { Authorization: `Bearer ${storedToken}`}
    return config;

})


const getListService = () =>{
    return service.get("/all")

}


const createNewListService = (id, name) =>{
    return service.post(`/${id}/new`, name)

}

const updateNewList = (idSong, idList) =>{
    return service.patch(`/${idSong}/old/${idList}`)

}




export{
    updateNewList,
    createNewListService,
    getListService


}
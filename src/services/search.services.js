import axios from "axios"

const service = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/search`
  })


  const searchService = () => {
      return service.get("/")

  }






  export {
    searchService

  }
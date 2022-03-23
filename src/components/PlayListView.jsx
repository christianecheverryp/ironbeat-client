import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getListService } from '../services/playlist.services'

function PlayListView() {

  const [ allPlaylist, setAllPlaylist ] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getRenderPlayList()
  }, [])



  const getRenderPlayList = async () =>{
    try{

      const response = await getListService()
      setAllPlaylist(response.data)
    }catch(err){
      navigate("/error")
    }
  }

  if(!allPlaylist){
    return <p>...Loading</p>
  }

  return (
    <div>
    
    <h2>Aqui van las LISTAS</h2>

    {allPlaylist.map((eachList) => {
      return (
        <div> 
          <Link to={`/${eachList._id}/playlist`}>

            <div>
              <h2>{eachList.name}</h2>
              <p>{eachList.list.length} Songs</p>
            </div>
        
          </Link>
          
        
        
        </div>
        
      )
    })}
    
    </div>
  )
}

export default PlayListView
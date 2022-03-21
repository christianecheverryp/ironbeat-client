import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllFollows } from '../services/user.services'

function FollowView(props) {
  const {follows, setFollows} = props

    
    const navigate = useNavigate()
    

    useEffect(() => {
      getFollowers()


    }, [follows])
    
    const getFollowers = async () => {
      try{
       const response = await getAllFollows()
       console.log(response.data)
       setFollows(response.data)
      }catch(err) {
        navigate("/error")
      }
      

    }
    
    if(!follows){
      return <div>...loading</div>
    }

  return (
    <div>


    <h5>AQUI VAN LOS FOLLOWERS</h5>

    {follows.map((eachFollow) => {
      return (
        <div>
          <p>{eachFollow.username}</p>
        </div>
      )
    })}



    </div>
  )
}

export default FollowView
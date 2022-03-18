import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMyProfileService } from '../../services/user.services'

function MyProfile() {

  const [ myProfile, setMyProfile ] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {

    try{

      const response = await getMyProfileService()
      setMyProfile(response.data)
      

    }catch(err){

      if(err.response.status === 401){
        navigate("/")
      }/* else{
        navigate("/error")
      } */

    }
  }

   if (!myProfile) {
    return <h3>...Loading</h3>
  } 

  return (
    <div>

      <h3>Ventana de mi perfil</h3>

        <img src={myProfile.imgProfile} alt="Profile-Picture" width={100}/>
        <p>{myProfile.username}</p>
        <p>{myProfile.bio}</p>



        <Link to="/profile/edit"><button>Edit</button></Link>




    </div>
  )
}

export default MyProfile
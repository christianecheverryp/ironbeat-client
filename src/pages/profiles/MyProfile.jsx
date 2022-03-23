import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMyProfileService } from '../../services/user.services'
import "../../css/details_profile.css"

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
    <div id="container-profile-details">

      {/* <h3>Ventana de mi perfil</h3>

        <img src={myProfile.imgProfile} alt="Profile-Picture" width={100}/>
        <p>{myProfile.username}</p>
        <p>{myProfile.bio}</p>



        <Link to="/profile/edit"><button>Edit</button></Link> */}


        <div class="content">
          <div class="card">
            <div class="firstinfo"><img src={myProfile.imgProfile}/>
              <div class="profileinfo">
                <h1>{myProfile.username}</h1>
                <h3>Python Ninja</h3>
                <p class="bio">{myProfile.bio}</p>
              <Link to="/profile/edit"><button>Edit</button></Link>
              </div>
            </div>
          </div>
          <div class="badgescard"> 
            <span class="devicons devicons-django"></span>
            <span class="devicons devicons-python"> </span>
            <span class="devicons devicons-codepen"></span>
          </div>
        </div>




    </div>
  )
}

export default MyProfile
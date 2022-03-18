import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOtherProfile } from '../../services/user.services'

function DetailsProfile() {

  const [ otherProfile, setOtherProfile] = useState(null)
  const {id} = useParams()
  const navigate = useNavigate()


  


  useEffect(()=> {
    getProfile()

  }, [])

  const getProfile = async () => {

    try{

      const response = await getOtherProfile(id)
      console.log(response.data)
      
      setOtherProfile(response.data)
      

    }catch(err){

      if(err.response.status === 401){
        navigate("/")
      }/* else{
        navigate("/error")
      } */

    }
  }
  if(!otherProfile){
    return <h3>...Loading</h3>
  }





  return (
    <div>


<h3>Ventana del perfil de {otherProfile.username}</h3>



<img src={otherProfile.imgProfile} alt="Profile-Picture" width={100}/>
<p>{otherProfile.username}</p>
<p>{otherProfile.bio}</p>



    
    
    
    
    
    </div>
  )
}

export default DetailsProfile
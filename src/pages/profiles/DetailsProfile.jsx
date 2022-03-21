import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { followService, getOtherProfile } from "../../services/user.services";
import { Button } from "@mui/material";

function DetailsProfile(props) {
  const { isLogin, logUserId, getFollowers, follows } = props;
  const { id } = useParams();
  const [otherProfile, setOtherProfile] = useState(null);
  const [follow, setFollow] = useState(Boolean);
  const navigate = useNavigate();
  

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {

    try {
      const response = await getOtherProfile(id);
      
      

      
      // console.log(follows)
      // kata
      // tienen follows
      // tienen response.data con el usuario actual
      // cambiarian SetFollow a true o false

      setOtherProfile(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
      } 
    }
  };

  const handleFollow = async () => {
    try {
      followService(otherProfile._id);
      // setFollow(!follow);

      getFollowers()

// if(follows[0].follows.includes(otherProfile._id)){
//   setFollow(true)
// } else {
//   setFollow(false)
// }
 
      
    } catch (err) {
      navigate("/error")
    }
  };

  if(logUserId == id){
    navigate("/profile")
  } 

  if (!otherProfile) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <h3>Ventana del perfil de {otherProfile.username}</h3>

      <img src={otherProfile.imgProfile} alt="Profile-Picture" width={100} />
      <p>{otherProfile.username}</p>
      <p>{otherProfile.bio}</p>

      {isLogin && (
        <Button onClick={handleFollow}>{follow ? "UnFollow" : "Follow"}</Button>
      )}
    </div>
  );
}

export default DetailsProfile;

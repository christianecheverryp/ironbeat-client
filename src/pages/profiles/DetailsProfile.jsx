import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { followService, getOtherProfile } from "../../services/user.services";
import { Button } from "@mui/material";
import "../../css/details_profile.css"

function DetailsProfile(props) {
  const [otherProfile, setOtherProfile] = useState(null);
  const [follow, SetFollow] = useState(false);
  const { isLogin, logUserId } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(props)

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {

    try {
      const response = await getOtherProfile(id);
      console.log(response.data);
      

      setOtherProfile(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/");
      } 
    }
  };

  const handleFollow = async () => {
    try {
      SetFollow(!follow);
      followService(otherProfile._id);
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
    <div id="container-profile-details">
{/*       <h3>Ventana del perfil de {otherProfile.username}</h3>

      <img src={otherProfile.imgProfile} alt="Profile-Picture" width={100} />
      <p>{otherProfile.username}</p>
      <p>{otherProfile.bio}</p>

      {isLogin && (
        <Button onClick={handleFollow}>{follow ? "UnFollow" : "Follow"}</Button>
      )} */}

      <div class="card-profile-details">
    <div class="img-avatar">
    <img src={otherProfile.imgProfile} alt="Profile-Picture"  />
    </div>
    <div class="card-text">
      <div class="portada">
      <img src={otherProfile.imgProfile} alt="Profile-Picture" />
      </div>
      <div class="title-total">
        <div class="title-profile-details">Inventor</div>
        <h2>{otherProfile.username}</h2>

        <div class="desc">Se le conoce sobre todo por sus numerosas invenciones en el campo del electromagnetismo, desarrolladas a finales del siglo XIX y principios del siglo XX.</div>

        <div class="actions-profile-details">
          <button><i class="fas fa-fire"></i></button>
          <button><i class="fas fa-envelope"></i></button>
          <button><i class="fas fa-user-friends"></i></button>
        </div>
      </div>
    </div>
  </div>






    </div>
  );
}

export default DetailsProfile;

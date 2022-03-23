import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { followService, getOtherProfile } from "../../services/user.services";
import { Button } from "@mui/material";
import "../../css/details_profile.css";

function DetailsProfile(props) {
  const { isLogin, logUserId, getFollowers, follows } = props;
  const { id } = useParams();
  const [otherProfile, setOtherProfile] = useState(null);
  const [follow, setFollow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
    
  }, []);

  const getProfile = async () => {
    try {
      const response = await getOtherProfile(id);
      if(!follows){
        return <div>...loading</div>
      }
      
      const followArray = follows.filter((eachFollow) => {
        return eachFollow._id.includes(id)
        })
        
       


        if (followArray.length < 1){
        setFollow(false)
        } else {
        setFollow(true)
        }


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
      await followService(otherProfile._id);
      setFollow(!follow);

      getFollowers();

      
      
    } catch (err) {
      navigate("/error");
    }
  };








  

  if (logUserId == id) {
    navigate("/profile");
  }

  



  if (!otherProfile) {
    return <h3>...Loading</h3>;
  }
// "container-profile-details"
  return (
    <div >
            <h3>Ventana del perfil de {otherProfile.username}</h3>

      <img src={otherProfile.imgProfile} alt="Profile-Picture" width={100} />
      <p>{otherProfile.username}</p>
      <p>{otherProfile.bio}</p>

      {isLogin && (
        <Button onClick={handleFollow}>{follow ? "UnFollow" : "Follow"}</Button>
      )}

      {/* <div class="card-profile-details">
        <div class="img-avatar">
          <img src={otherProfile.imgProfile} alt="Profile-Picture" />
        </div>
        <div class="card-text">
          <div class="portada">
            <img src={otherProfile.imgProfile} alt="Profile-Picture" />
          </div>
          <div class="title-total">
            <div class="title-profile-details">Inventor</div>
            <h2>{otherProfile.username}</h2>

            <div class="desc">
              Se le conoce sobre todo por sus numerosas invenciones en el campo
              del electromagnetismo, desarrolladas a finales del siglo XIX y
              principios del siglo XX.
            </div>

            <div class="actions-profile-details">
              <button>
                <i class="fas fa-fire"></i>
              </button>
              <button>
                <i class="fas fa-envelope"></i>
              </button>
              <button>
                <i class="fas fa-user-friends"></i>
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default DetailsProfile;

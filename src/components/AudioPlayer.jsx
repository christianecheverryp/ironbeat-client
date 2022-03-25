import React, { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom"
import WaveSurfer from "wavesurfer.js";
import { getSongDetailsService, getSongPlaysService } from "../services/song.services";
import { useNavigate } from 'react-router-dom'
import { Button } from "@mui/material";
import { putFavoritesService } from "../services/user.services";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 48,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

function AudioPlayer(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false); //AQUI ES PARA DAR EL PLAY
  const [volume, setVolume] = useState(0.5); //ESE ES EL VOLUMEN
  const { isLogin, logUserId } = props;
  const navigate = useNavigate()
  const [like, setLike] = useState(false)
  



  useEffect(() => {
    setPlay(false);
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(props.eachSong.audioUrl);

    wavesurfer.current.on("ready", function () {
      //EN EL EFFECT PONEMOS TODOS LOS PARAMETROS QUE QUERAMOS
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [props.eachSong.audioUrl]);

  //FUNCIONES QUE QUERAMOS PONER

  const handlePlayPause = async () => {
    setPlay(!playing);
    if(playing){
      await getSongPlaysService(props.eachSong._id)
    }

    wavesurfer.current.playPause();

  };
  

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  const handleAddList = () => {
    navigate(`/${props.eachSong._id}/add-list`)
  }

  const handleAddCart = async() => {
    try{
      await putFavoritesService(props.eachSong._id)
      setLike(!like)
      


      // const followArray = logUserId.shoppingList.filter((eachLike) => {
      //   return eachLike == props.eachSong._id
      //   })
        

      //   if (followArray.length < 1){
      //     setLike(false)
      //   } else {
      //     setLike(true)
      //   }
      

    }catch(err){
      navigate("/error")
    }
    

  }

  return (
    <div id="block-player">
    <div className="player">
     <div className="control">
            <i onClick={handlePlayPause}>{!playing ?  <PlayArrowIcon/> : <PauseIcon/> }</i>
          </div>
      

      <div className="info">
      <div className="name-photo-container">

  <div className="title">
          
        <img className="photo-song" src={props.eachSong.imgSong} alt="" width={50} />
      
          <div className="owner ">
              <span id="current"><Link className="owner-name sm-width" to={`/profile/${props.eachSong.owner._id}/details`}>@{props.eachSong.owner.username}</Link></span>
              
            </div>
            
            <div className="title-song sm-width" >
            <Link className="title-name" to={`/song/${props.eachSong._id}/details`}>{props.eachSong.title}</Link>     {/* PREGUNTAR SI HAY ALGUNA FORMA BONITA DE HACERLO */}
            </div>
            
          </div>

      </div>
      
        <div className="detail">
        
        
          

         
        </div>

        <div id="waveform" className="wave-size" ref={waveformRef}></div>
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />


        <div className="down-container flex-row">

        <div className="flex-row">
<div className="owner light-letters">
             
              {isLogin && <Button style={{
                backgroundColor: "#24724b",
                fontSize: "8px",
              }} onClick={handleAddList}><PlaylistAddIcon/></Button>}
              
            </div>
            <div>{isLogin && <Button onClick={handleAddCart}>{!like ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</Button>}</div>

        </div>


           
            

            <div className="owner">
              <span id="current">{props.eachSong.plays} Plays</span>
  
            </div>
        </div>
       
      </div>
    </div>
    </div>
  );

}

export default AudioPlayer;

import React, { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom"
import WaveSurfer from "wavesurfer.js";
import { getSongDetailsService } from "../services/song.services";
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from "@mui/material";
import { shoppingCartService } from "../services/user.services";

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
  const { isLogin } = props;
  const navigate = useNavigate()
  



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

  const handlePlayPause = () => {
    setPlay(!playing);

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
      await shoppingCartService(props.eachSong._id)

    }catch(err){
      navigate("/error")
    }
    

  }

  return (
    <div className="player">
      <div className="thumb">
        <img src={props.eachSong.imgSong} alt="" />
      </div>

      <div className="info">
        <div className="detail">
          <div className="title">
            <Link to={`/song/${props.eachSong._id}/details`}>{props.eachSong.title}</Link>     {/* PREGUNTAR SI HAY ALGUNA FORMA BONITA DE HACERLO */}
            <div className="owner">
              <span id="current"><Link to={`/profile/${props.eachSong.owner._id}/details`}>{props.eachSong.owner.username}</Link></span>
            </div>
          </div>

          <div className="control">
            <i onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</i>
          </div>
        </div>

        <div id="waveform" ref={waveformRef}></div>
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
        <div className="owner">
              <span id="current">Precio: {props.eachSong.price}</span>
              {isLogin && <Button onClick={handleAddCart}>Buy</Button>}
              
            </div>
            <div className="owner">
             
              {isLogin && <Button  onClick={handleAddList}>Add to Playlist</Button>}
              
            </div>
      </div>
    </div>
  );
}

export default AudioPlayer;

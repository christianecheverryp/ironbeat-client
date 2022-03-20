import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

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

  return (
    <div className="player">
      <div className="thumb">
        <img src={props.eachSong.imgSong} alt="" />
      </div>

      <div className="info">
        <div className="detail">
          <div className="title">
            {props.eachSong.title}
            <div className="owner">
              <span id="current">User</span>
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
        <div>Comprar</div>
      </div>
    </div>
  );
}

export default AudioPlayer;
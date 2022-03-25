import styled from "@emotion/styled";
import { PhotoCamera } from "@material-ui/icons";
import {
  Avatar,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSongService } from "../../services/song.services";
import {
  uploadAlbumImgService,
  uploadSongService,
} from "../../services/upload.services";
import SongDetails from "./SongDetails";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

function AddSong() {
  const [title, setTitle] = useState("");
  const [imgSong, setImgSong] = useState("https://res.cloudinary.com/alexfurty/image/upload/v1648069475/photos-gallery/jq5j8ibdeqyzf6k0xzqk.png");
  const [price, setPrice] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [audioUploading, setAudioUploading] = useState(false);

  const navigate = useNavigate();

  const handleImgUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("albumImg", e.target.files[0]);
    setImageUploading(true);
    uploadAlbumImgService(uploadData)
      .then((response) => {
        setImageUploading(false);
        setImgSong(response.data.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleAudioUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("music", e.target.files[0]);
    setAudioUploading(true);
    uploadSongService(uploadData)
      .then((response) => {
        console.log(response);
        setAudioUploading(false);
        setAudioUrl(response.data.musicUrl);
        console.log("consoe", response.data);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addSongService({ title, imgSong, price, audioUrl });
      navigate("/");
    } catch (err) {
      navigate("/error");
    }
  };

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div className="flex-row center-box">
    <div className="upload-picture">

          
         

          {imageUploading ? (
            <div>...Loading</div>
          ) : (
             <img src={imgSong} width={100} /> 
          )}

{/*           <label className="margin-between" htmlFor="icon-button-file">
            <Input
              className="hide-input"
              accept="image/*"
              id="icon-button-file"
              type="file"
              name="imgSong"
              onChange={(e) => handleImgUpload(e)}
            />
            <IconButton
              style={{
                backgroundColor: "#24724b",
                fontSize: "8px",
              }}
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label> */}

          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" multiple type="file" onChange={(e) => handleImgUpload(e)}/>
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
          </label>
          

          </div>
    <div className="add-page">
    
      <div className="add-container">
        <h3 /*className="light-letters"*/>Share your track</h3>
        <br />

        <form onSubmit={handleSubmit}>
          <TextField
          //  style={{
          //       backgroundColor: "#24724b",
          //       fontSize: "8px",
          //     }}
          
            className="light-letters"
            helperText="Please enter the title"
            id="demo-helper-text-misaligned"
            label="Song Title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />


         

          <label htmlFor="contained-button-file2">
            <Input
              className="hide-input"
              id="contained-button-file2"
              multiple
              type="file"
              name="audioUrl"
              onChange={(e) => handleAudioUpload(e)}
            />
            <Button
              style={{
                backgroundColor: "#24724b",
                fontSize: "8px",
              }}
              variant="contained"
              component="span"

            >
            <AudiotrackIcon/>
              Upload your track
            </Button>
          </label>

          {audioUploading ? (
            <div>...Loading</div>
          ) : (
            <p>{SongDetails.audioUrl}</p>
          )}

          <button>Add</button>
        </form>
      </div>
      </div> 
    </div>
  );
}

export default AddSong;

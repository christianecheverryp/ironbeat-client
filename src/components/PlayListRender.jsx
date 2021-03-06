import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import PlayList from "../components/PlayList";
import {
  deletePlaylistService,
  getSingleListService,
} from "../services/playlist.services";

function PlayListRender() {
  const [singleList, setSingleList] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleList();
  }, []);

  const getSingleList = async () => {
    try {
      const response = await getSingleListService(id);
      setSingleList(response.data.list);
      setSelectedTrack(response.data.list[0]);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePlaylistService(id);
      navigate("/");
    } catch (err) {
      navigate("/error");
    }
  };
  if (!singleList || !selectedTrack) {
    return <p>...Loading</p>;
  }

  return (
    <div>
      {/* <h2>{singleList.owner.username}'s playlist</h2> */}

      <AudioPlayer eachSong={selectedTrack} />
      <PlayList
        singleList={singleList}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />

      <Button onClick={handleDelete}>Delete playlist</Button>
    </div>
  );
}

export default PlayListRender;

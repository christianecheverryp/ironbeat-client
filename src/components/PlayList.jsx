import { Button } from "@mui/material";
import React from "react";
import { deleteFromTheListService } from "../services/song.services";

const PlayList = ({ singleList, selectedTrack, setSelectedTrack }) => {

  // const handleDelete = async(id) => {
  //   await deleteFromTheListService(id)
  // }

  return (
    <div className="playlist">
      {singleList.map(eachTrack => (
        <div
          key={eachTrack._id}
          className={
            eachTrack._id === selectedTrack._id
              ? "playlist-item selected"
              : "playlist-item"
          }
          onClick={() => setSelectedTrack(eachTrack)}
        >
          {eachTrack.title}
          {/* <div><Button onClick={handleDelete(eachTrack._id)}>delete</Button> </div> */}
        </div>
      ))}
    </div>
  );
};

export default PlayList;
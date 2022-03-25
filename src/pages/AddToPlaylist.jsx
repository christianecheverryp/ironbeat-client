import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNewListService,
  getListService,
  updateNewList,
} from "../services/playlist.services";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function AddToPlaylist(props) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [allPlaylist, setAllPlaylist] = useState(null);
  const { id } = useParams();
  const [listToAdd, setListToAdd] = useState("");
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getAllPlaylist();
  }, []);

  const getAllPlaylist = async () => {
    try {
      const response = await getListService();
      console.log(response.data);

      setAllPlaylist(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewListService(id, { name });
      navigate("/");
    } catch (err) {
      navigate("/error");
    }
  };

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const handleSelectPlaylist = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setListToAdd(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOldList = async (e) => {
    e.preventDefault();

    try {
      await updateNewList(id, listToAdd);
      navigate("/");
    } catch (err) {
      navigate("/error");
    }
  };

  if (!allPlaylist) {
    return <div>...loading</div>;
  }

  return (
    <div className="add-page flex-column">
      <h3>Add the track to a playlist</h3>
      <button onClick={handleForm}>Create a new list</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name list:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <button>Create</button>
        </form>
      )}

      <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
        Choose
      </Button>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="list" id="demo-controlled-open-select-label">
          Playlist
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={listToAdd}
          name="list"
          onChange={handleSelectPlaylist}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {allPlaylist.map((eachList) => {
            return <MenuItem value={eachList._id}>{eachList.name}</MenuItem>;
          })}
        </Select>
        <Button onClick={handleOldList}>Add</Button>
      </FormControl>
    </div>
  );
}

export default AddToPlaylist;

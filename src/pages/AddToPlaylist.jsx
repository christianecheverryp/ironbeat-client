import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNewListService,
  getListService,
  updateNewList,
} from "../services/playlist.services";

function AddToPlaylist(props) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [allPlaylist, setAllPlaylist] = useState(null);
  const { id } = useParams();
  const [listToAdd, setListToAdd] = useState("")

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
    } catch (err) {
      navigate("/error");
    }
  };

  // crear estado para controlar el select


  const handleSelectPlaylist = (e) => {
      e.preventDefault()
      console.log(e.target.value)
      setListToAdd(e.target.value)

  }





  const handleOldList = async (e) => {
      e.preventDefault()

    try {
        

      await updateNewList(id, listToAdd);
    } catch (err) {
      navigate("/error");
    }
  };

  if (!allPlaylist) {
    return <div>...loading</div>;
  }

  return (
    <div>
      <h3>Here we add to the playlist</h3>
      <button>Nueva lista</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">nombre de la lista:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button>Crear</button>
      </form>

      <h4>AQUI LISTAS ANTIGUAS</h4>

      <form onSubmit={handleOldList}>
        <label htmlFor="list">Choose the playlist:</label>

        <select name="list" value={listToAdd} onChange={handleSelectPlaylist}>
          <option value="">Choose</option>

          {allPlaylist.map((eachList) => {
            return <option value={eachList._id}>{eachList.name}</option>
          })}
        </select>
        <button>add</button>
       </form> 
    </div>
  );
}

export default AddToPlaylist;

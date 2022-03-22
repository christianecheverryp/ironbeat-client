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
//   const [selectedOption, setSelectedOption] = useState(title[0].value);

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

//   const handleOldList = async (selectedOption) => {
//     try {
//       await updateNewList(id, selectedOption);
//     } catch (err) {
//       navigate("/error");
//     }
//   };

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

      {/* <form onSubmit={handleOldList}> */}
        <label htmlFor="list">Choose the playlist:</label>

        <select name="list">
          <option value="">Choose</option>

          {allPlaylist.map((eachList) => {
            return <option>{eachList.name}</option>
          })}
        </select>
        <button>add</button>
       {/* </form>  */}
    </div>
  );
}

export default AddToPlaylist;

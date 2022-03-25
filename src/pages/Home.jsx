import React, { useEffect, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { getAllMusicService } from "../services/song.services";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";

function Home(props) {
  const [allMusic, setAllMusic] = useState([]);
  const { isLogin } = props;
  // const [items, setItems] = useState([])
  const [isNext, setIsNext] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [canFetchSongs, setCanFetchSongs] = useState(false);

  useEffect(() => {
    getAllMusic();
  }, []);

  const getAllMusic = async () => {
    const response = await getAllMusicService(pageCount);
    setAllMusic([...allMusic, ...response.data]);
    // si no hay canciones en response.data, no activas el settimeout
    if (response.data) {
      setTimeout(() => {
        setCanFetchSongs(true);
      }, 3000);
      setIsNext(true);
    }
  };
  function fetchMoreData() {
    if (canFetchSongs) {
      setCanFetchSongs(false);
      setPageCount(pageCount + 1);
      getAllMusic();
    }
  }

  if (!allMusic) {
    return <div>...loading</div>;
  }

  return (
    <div className="flex-column align-center">
      <h1>Welcome to Ironbeat!</h1>
      <div className="scroll-container">
        <InfiniteScroll
          dataLength={allMusic.length}
          // next={loadMoreData}
          next={fetchMoreData}
          hasMore={isNext}
          loader={
            <div
              style={{ height: "80%", paddingLeft: "35%", overflow: "hidden" }}
            >
              <CircularProgress />
            </div>
          }
        >
          {allMusic.map((eachSong) => {
            return <AudioPlayer eachSong={eachSong} isLogin={isLogin} />;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;

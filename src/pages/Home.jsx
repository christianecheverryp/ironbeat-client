import React, { useEffect, useState } from 'react'
import AudioPlayer from '../components/AudioPlayer'
import { getAllMusicService } from '../services/song.services'
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from '@mui/material';

function Home(props) {

  const [allMusic, setAllMusic] = useState([])
  const {isLogin} = props
  // const [items, setItems] = useState([])
  const [isNext, setIsNext] = useState(false)
  const [pageCount, setPageCount] = useState(1)
  
  

  useEffect(()=> {
    getAllMusic()

  }, [])

  





  const getAllMusic = async() => {
    const response = await getAllMusicService()
    setAllMusic([...allMusic, ...response.data])
    setIsNext(true)


  }
  function fetchMoreData() {
    setPageCount(pageCount + 1);
    getAllMusic();
  }

 

  if (!allMusic) {
    return <div>...loading</div>
  }




  return (
    <div className='flex-column align-center'>

      <h1>HOME</h1>
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

      {allMusic.map((eachSong)=> {
        return <AudioPlayer eachSong={eachSong} isLogin={isLogin}/>


      })}
      </InfiniteScroll>







    </div>
  )
}

export default Home
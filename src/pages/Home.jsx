import React, { useEffect, useState } from 'react'
import AudioPlayer from '../components/AudioPlayer'
import { getAllMusicService } from '../services/song.services'

function Home(props) {

  const [allMusic, setAllMusic] = useState(null)
  const {isLogin} = props
  

  useEffect(()=> {
    getAllMusic()

  }, [])

  const getAllMusic = async() => {
    const response = await getAllMusicService()
    setAllMusic(response.data)


  }

  // const pauseAllSongs = (pauseSingleSong) => {

  //   pauseSingleSong()
  // }

  if (!allMusic) {
    return <div>...loading</div>
  }




  return (
    <div>

      <h1>HOME</h1>

      {allMusic.map((eachSong)=> {
        return <AudioPlayer eachSong={eachSong} isLogin={isLogin}/>


      })}







    </div>
  )
}

export default Home
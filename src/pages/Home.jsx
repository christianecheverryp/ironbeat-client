import React, { useEffect, useState } from 'react'
import AudioPlayer from '../components/AudioPlayer'
import { getAllMusicService } from '../services/song.services'

function Home() {

  const [allMusic, setAllMusic] = useState(null)

  useEffect(()=> {
    getAllMusic()

  }, [])

  const getAllMusic = async() => {
    const response = await getAllMusicService()
    setAllMusic(response.data)


  }

  if (!allMusic) {
    return <div>...loading</div>
  }




  return (
    <div>

      <h1>HOME</h1>

      {allMusic.map((eachSong)=> {
        return <AudioPlayer eachSong={eachSong}/>


      })}







    </div>
  )
}

export default Home
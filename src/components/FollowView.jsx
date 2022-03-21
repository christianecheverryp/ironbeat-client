import React, { useEffect } from 'react'

function FollowView(props) {
  const {follows, setFollows} = props

    
    

    useEffect(() => {


    }, [])
    
    
    
    if(!follows){
      return <div>...loading</div>
    }

  return (
    <div>


    <h5>AQUI VAN LOS FOLLOWERS</h5>

    {follows.map((eachFollow) => {
      return (
        <div>
          <p>{eachFollow.username}</p>
        </div>
      )
    })}



    </div>
  )
}

export default FollowView
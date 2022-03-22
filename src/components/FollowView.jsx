import React, { useEffect } from 'react'

function FollowView(props) {
  const {follows, setFollows} = props

    
    

<<<<<<< HEAD
/*     useEffect(() => {
      getFollowers()


    }, [follows]) */
    
    /* const getFollowers = async () => {
      try{
       const response = await getAllFollows()
       console.log(response.data)
       setFollows(response.data)
      }catch(err) {
        navigate("/error")
      }
      

    }
=======
    useEffect(() => {


    }, [])
    
    
>>>>>>> 049ccee7ec8bee5ffb431445567f305d632f139d
    
    if(!follows){
      return <div>...loading</div>
    }
 */
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
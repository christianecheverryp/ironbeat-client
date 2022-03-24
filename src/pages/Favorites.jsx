
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFavoritesService } from '../services/user.services'

function Favorites() {

    const [favoritesList, setFavoritesList] = useState(null)
    
    const navigate = useNavigate()
    

    useEffect(()=> {
        getShoppingList()

    }, [])

    const getShoppingList = async () => {
        try{

           const response = await getFavoritesService()
           console.log(response.data)
           setFavoritesList(response.data)
        }catch(err){
            navigate("/error")
        }
    }


    if(!favoritesList){
        return <div>...loading</div>
    }




  return (
    <div>
    <h3>AQUI VAN LAS COMPRAS</h3>


    {favoritesList.shoppingList.map((eachShop)=>{
        return <p>{eachShop.title}</p>
    })}



 










    
    
    </div>
  )
}

export default Favorites
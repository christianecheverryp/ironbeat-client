
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getShoppingListService } from '../services/user.services'

function ShoppingCart() {

    const [shoppingList, setShoppingList] = useState(null)
    
    const navigate = useNavigate()
    

    useEffect(()=> {
        getShoppingList()

    }, [])

    const getShoppingList = async () => {
        try{

           const response = await getShoppingListService()
           console.log(response.data)
           setShoppingList(response.data)
        }catch(err){
            navigate("/error")
        }
    }


    if(!shoppingList){
        return <div>...loading</div>
    }




  return (
    <div>
    <h3>AQUI VAN LAS COMPRAS</h3>


    {shoppingList.shoppingList.map((eachShop)=>{
        return <p>{eachShop.title}</p>
    })}



 










    
    
    </div>
  )
}

export default ShoppingCart
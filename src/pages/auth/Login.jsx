import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../../services/auth.services'

function Login(props) {

  const [ username, setUsername ] = useState("")
  //const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState("") 

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = { username, password }

    try{

      const response = await loginService(user)
      const { authToken } = response.data

      localStorage.setItem("authToken", authToken)

      props.setIsLogin(true)

      navigate("/")

    }catch(err){

      if(err.response.status === 400){
        setErrorMessage(err?.response?.data.errorMessage)
      }else if(err.response.status === 401) {
        setErrorMessage(err?.response?.data.errorMessage)
        
      } else{
        navigate("/error")
      }

    }
  }


  return (
    <div>

      <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />

          <label htmlFor="password">Password:</label>
          <input type="text" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />

          <button>Login</button>

      </form>

      <p>{errorMessage}</p>
    
    
    
    </div>
  )
}

export default Login
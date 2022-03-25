import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../../services/auth.services'
import "../../css/login.css"

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
/*     <div>

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
    
    
    
    </div> */


    <div id='hola'>


<div class="loginSection">


  <form onSubmit={handleSubmit} class="signupForm-login" name="signupform">
    <h2>Sign Up</h2>
    <ul class="noBullet">

      <li>
        <label htmlFor="username"></label>
        <input type="text" class="inputFields" id="username-login" name='username' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
      </li>

      <li>
        <label htmlFor="password"></label>
        <input type="password" class="inputFields" id="password-login" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </li>


      <li id='center-btn'>
        <input type="submit" id="join-btn-login" name="join" alt="Join" value="Join" />

      </li>


    </ul>
  </form>
 

</div>
 <p className='error-message'>{errorMessage}</p>



</div>
  )
}

export default Login
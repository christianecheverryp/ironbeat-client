import { NavLink, useNavigate } from "react-router-dom"
import profile_icon from "../images/profile_icon.png"
import message_icon from "../images/message.png"
import home_icon from "../images/home_icon.png"
import add_icon from "../images/add_icon.png"
import SearchBar from "./SearchBar"


function NavBar(props) {

const { isLogin, setIsLogin } = props

const navigate = useNavigate();

const handleLogOut = () => {

  setIsLogin(false)
  localStorage.removeItem("authToken")

  navigate("/")

}

  return (
    <div>
        <NavLink to="/profile">
            <img src={profile_icon} alt="ProfileImg" width={20} />
        </NavLink>

        <NavLink to="/add-song"> <img src={add_icon} alt="AddImg" width={20}/> </NavLink>


        <NavLink to="/messages">
            <img src={message_icon} alt="MessageImg" width={20}/>
        </NavLink> 

        <SearchBar />

        <NavLink to="/">
            <img src={home_icon} alt="HomeImg" width={20} />
        </NavLink>

        <NavLink to="/signup">
            signup
        </NavLink>

        <NavLink to="/login">
            login
        </NavLink>

        <button onClick={handleLogOut}>Logout</button>
        

    
    
    </div>
  )
}

export default NavBar
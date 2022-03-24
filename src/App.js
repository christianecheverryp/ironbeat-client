import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import DetailsProfile from './pages/profiles/DetailsProfile';
import EditProfile from './pages/profiles/EditProfile';
import MyProfile from './pages/profiles/MyProfile';
import AddSong from './pages/songs/AddSong';
import SongDetails from './pages/songs/SongDetails';
import Error from "./pages/Error"
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import { verifyService } from './services/auth.services';
import FollowView from './components/FollowView';
import PlayListRender from './components/PlayListRender';
import AddToPlaylist from './pages/AddToPlaylist';
import { getAllFollows } from './services/user.services'
import ShoppingCart from './pages/ShoppingCart';
import PlayListView from './components/PlayListView';
import TemporaryDrawer from './components/TemporaryDrawer';


function App() {

  const [ isLogin, setIsLogin ] = useState(false)
  const [ logUserId, setLogUserId ] = useState(null)
  const [ fetchingUser, setFetchingUser ] = useState(true)
  const [ follows, setFollows ] = useState(null)


  const navigate = useNavigate()

  useEffect(() => {
    verifyUser()
  }, [])

  const verifyUser = async () => {
    try{
      const response = await verifyService()
      setLogUserId(response.data._id)
      setIsLogin(true)
      getFollowers()
      setFetchingUser(false)
    }catch(err){
      setLogUserId(null)
      setIsLogin(false)
      setFetchingUser(false)
    }
  }


  const getFollowers = async () => {
    try{
     const response = await getAllFollows()
     setFollows(response.data)

     
    }catch(err) {
      navigate("/error")
    }
  }

  if (fetchingUser) {
    <h3>...Loading</h3>
  }

/* if(!follows){
      return <div>...loading</div>
    } */

  return (
    <div className="App">

      <NavBar setIsLogin={setIsLogin} isLogin={isLogin}/>

    <div className='container'>

    <div className='container-playlist '>
      {isLogin && <TemporaryDrawer/> }
    </div>

    
 
    
    <div>
      <Routes >
      <Route path='/' element={ <Home isLogin={isLogin} /> }/>
      <Route path='/profile' element={ <MyProfile /> } />
      <Route path='/profile/:id/details' element={ <DetailsProfile isLogin={isLogin} logUserId={logUserId} follows={follows} getFollowers={getFollowers}/> } />
      <Route path='/profile/edit' element={ <EditProfile /> } />

      <Route path='/add-song' element={ <AddSong /> } />
      <Route path='/song/:id/details' element={ <SongDetails isLogin={isLogin} /> } />

      <Route path='/:id/add-list' element={ <AddToPlaylist/>}/>
      <Route path='/:id/playlist' element={ <PlayListRender/>} />
      
      <Route path="/shopping-cart" element={<ShoppingCart/>}/>




      <Route path='/login' element={ <Login setIsLogin={setIsLogin}/> } />
      <Route path='/signup' element={ <Signup /> } />

      <Route path='/error' element={ <Error /> } />
      <Route path='*' element={ <NotFound /> } />
      <Route path='/followers' element={<FollowView/>}/>



      
      

    </Routes>
    </div>
    <div className='follow-view'> {/* quitar la clase */}
{isLogin && <FollowView className="container-follows" follows={follows}/> }
    </div>


</div>
   

      

    </div>
  );
}

export default App;

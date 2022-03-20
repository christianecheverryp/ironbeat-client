import { Route, Routes } from 'react-router-dom';
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

function App() {

  const [ isLogin, setIsLogin ] = useState(false)

  useEffect(() => {
    verifyUser()
  }, [])

  const verifyUser = async () => {
    try{
      await verifyService()
      setIsLogin(true)
    }catch(err){
      setIsLogin(false)
    }
  }

  return (
    <div className="App">

    <NavBar setIsLogin={setIsLogin} isLogin={isLogin}/>

<div className='container'>
 
    
    <div>
      <Routes >
      <Route path='/' element={ <Home isLogin={isLogin}/> }/>
      <Route path='/profile' element={ <MyProfile /> } />
      <Route path='/profile/:id/details' element={ <DetailsProfile isLogin={isLogin}/> } />
      <Route path='/profile/edit' element={ <EditProfile /> } />

      <Route path='/add-song' element={ <AddSong /> } />
      <Route path='/song/:id/details' element={ <SongDetails isLogin={isLogin} /> } />

      <Route path='/login' element={ <Login setIsLogin={setIsLogin}/> } />
      <Route path='/signup' element={ <Signup /> } />

      <Route path='/error' element={ <Error /> } />
      <Route path='*' element={ <NotFound /> } />
      <Route path='/followers' element={<FollowView/>}/>

      
      

    </Routes>
    </div>
    <div className='follow-view'>
{isLogin && <FollowView/> }
    </div>


</div>
   

      

    </div>
  );
}

export default App;

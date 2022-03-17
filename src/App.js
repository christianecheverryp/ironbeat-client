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

function App() {
  return (
    <div className="App">

    <NavBar />

    <Routes >
      <Route path='/' element={ <Home /> }/>
      <Route path='/profile' element={ <MyProfile /> } />
      <Route path='/profile/:id/details' element={ <DetailsProfile /> } />
      <Route path='/profile/edit' element={ <EditProfile /> } />

      <Route path='/add-song' element={ <AddSong /> } />
      <Route path='/song/:id/details' element={ <SongDetails /> } />

      <Route path='/login' element={ <Login /> } />
      <Route path='/signup' element={ <Signup /> } />

      <Route path='/error' element={ <Error /> } />
      <Route path='*' element={ <NotFound /> } />

      
      

    </Routes>

      

    </div>
  );
}

export default App;

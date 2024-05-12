import React, { useEffect } from 'react';

// Components
import { PrivateRoute } from './Components/auth/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import Home from './Pages/Home';
import CreateStory from './Pages/Story/CreateStory';
import Profile from './Pages/profile/Profile';
import Signup from './Pages/Account/Signup';
import Login from './Pages/Account/Login';
import ResetPassword from './Pages/Account/ResetPassword';
import UpdateStory from './Pages/Story/UpdateStory';
import LikedStories from './Pages/Story/LikedStories';
import BookMark from './Pages/Story/SavedStories';
import AboutPolicy from './Pages/AboutPolicy';
import ReadStory from './Pages/Story/ReadStory';
import EditProfile from './Pages/profile/EditProfile';
import Following from './Pages/Following';
// CSS
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './Redux/slice/AuthSlice';
import { auth } from '../Firebase';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      user && dispatch(setCurrentUser(user.uid))
    })
    return () => unsubscribe()
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2400} />
      <Routes>
        <Route path='/ResetPassword' element={<ResetPassword />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/aboutpolicy' element={<AboutPolicy />} />
        <Route path='/Readstory/:storyID' element={<ReadStory />} />
        <Route element={<PrivateRoute />}>
          <Route path='/likedstories' element={<LikedStories/>} />
          <Route path='/following' element={<Following />} />
          <Route path='/savedstories' element={<BookMark />} />
          <Route path='/profile/:sageID?' element={<Profile />} />
          <Route path='/CreateStory' element={<CreateStory />} />
          <Route path='/updateStory/:storyID' element={<UpdateStory />} />
          <Route path='/editprofile' element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
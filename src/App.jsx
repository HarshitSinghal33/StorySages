import React, { Suspense, lazy } from 'react';

// Components
import { PrivateRoute } from './Components/Auth/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Loader } from './Components/Common/Loader';

// Pages
const Home = lazy(() => import('./Pages/Home').then(module => ({ default: module.Home })));
const CreateStory = lazy(() => import('./Pages/Story/CreateStory').then(module => ({ default: module.CreateStory })));
const Profile = lazy(() => import('./Pages/Profile/Profile').then(module => ({ default: module.Profile })));
const Signup = lazy(() => import('./Pages/Account/Signup').then(module => ({ default: module.Signup })));
const Login = lazy(() => import('./Pages/Account/Login').then(module => ({ default: module.Login })));
const ResetPassword = lazy(() => import('./Pages/Account/ResetPassword').then(module => ({ default: module.ResetPassword })));
const UpdateStory = lazy(() => import('./Pages/Story/UpdateStory').then(module => ({ default: module.UpdateStory })));
const LikedStories = lazy(() => import('./Pages/Story/LikedStories').then(module => ({ default: module.LikedStories })));
const SavedStories = lazy(() => import('./Pages/Story/SavedStories').then(module => ({ default: module.SavedStories })));
const AboutPolicy = lazy(() => import('./Pages/AboutPolicy').then(module => ({ default: module.AboutPolicy })));
const ReadStory = lazy(() => import('./Pages/Story/ReadStory').then(module => ({ default: module.ReadStory })));
const UpdateProfile = lazy(() => import('./Pages/Profile/UpdateProfile').then(module => ({ default: module.UpdateProfile })));
const Following = lazy(() => import('./Pages/Following').then(module => ({ default: module.Following })));

// CSS
import 'react-toastify/dist/ReactToastify.css'
import { useOnAuthStateChange } from './Hooks/useOnAuthStateChange';
import EmailVerifyNotification from './Components/Common/EmailVerifyNotification';

function App() {
  const { isEmailVerified } = useOnAuthStateChange();
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2400} />
      {(isEmailVerified === false) && <EmailVerifyNotification />}
      <Suspense fallback={<Loader isCenter={true} />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/aboutpolicy' element={<AboutPolicy />} />
          <Route path='/readstory/:storyID' element={<ReadStory />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path='/likedstories' element={<LikedStories />} />
            <Route path='/following' element={<Following />} />
            <Route path='/savedstories' element={<SavedStories />} />
            <Route path='/profile/:sageID?' element={<Profile />} />
            <Route path='/createStory' element={<CreateStory />} />
            <Route path='/updateStory/:storyID' element={<UpdateStory />} />
            <Route path='/updateprofile' element={<UpdateProfile />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
export default App
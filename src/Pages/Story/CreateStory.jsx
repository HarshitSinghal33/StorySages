import React from 'react';
import { useSelector } from 'react-redux';

// Custom Hooks
import useFetchUserData from '../../hooks/fetch/useFetchUserData';
import useUpdateStory from '../../hooks/update/useUpdateStory';

// Redux
import { userUID } from '../../Redux/slice/AuthSlice';

// UI Components
import Navigator from '../../Components/Common/Navigator';
import Header from '../../Components/Common/Header';
import Loader from '../../Components/Common/Loader';
import Error from '../../Components/Common/Error';
import StoryForm from '../../Components/Story/Form/StoryForm';

export default function CreateStory() {
  const user = useSelector(userUID)
  const { addStory } = useUpdateStory();
  const { userData, userDataError, isUserDataLoading } = useFetchUserData({userID: user });

  function renderContent(){
    if(isUserDataLoading) return <Loader isCenter={true}/>;
    if(userDataError) return <Error message={userDataError.message}/>;
    if(userData) return <StoryForm  submitFunc={addStory} userName={userData?.name} user={user}/>;
  }
  
  return (
    <>
      <Header />
      {renderContent()}
      <Navigator />
    </>
  )
}
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Custom Hooks
import useFetchUserData from '../../hooks/fetch/useFetchUserData';
import useFetchStories from '../../hooks/fetch/useFetchStories';

// Redux
import { userUID } from '../../Redux/slice/AuthSlice';
import { currentFolder } from '../../Redux/slice/CurrentFolderSlice';

// UI Components
import Navigator from '../../Components/Common/Navigator';
import Header from '../../Components/Common/Header';
import Setting from '../../Components/profile/settings/Setting';
import UserDetail from '../../Components/profile/ProfileDetail';
import UserStoryFilter from '../../Components/profile/ProfileStoryFilter';
import Loader from '../../Components/Common/Loader';
import Error from '../../Components/Common/Error';
import AutoLoadContainer from '../../Components/Containers/AutoLoadContainer';

export default function Profile() {
  const { sageID } = useParams();
  const user = useSelector(userUID);
  const folder = useSelector(currentFolder);
  const [settingOpen, isSettingOpen] = useState(false);
  const isCurrentUserProfile = !sageID || sageID === user;
  const handleSettingOpen = () => isSettingOpen(prev => !prev);

  const {
    userData: profileData,
    userDataError: profileDataError,
    isUserDataLoading: isProfileDataLoading
  } = useFetchUserData({ userID: sageID || user })

  const {
    stories,
    storiesError,
    isStoriesLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useFetchStories({
    user: isCurrentUserProfile ? user : sageID,
    visibility: isCurrentUserProfile ? folder : 'public'
  })

  return (
    <>
      <Header />

      {isProfileDataLoading && <Loader isCenter={true} />}
      
      {profileDataError && <Error message={userDataError.message} />}

      {profileData && (
        <>
          <UserDetail
            isCurrentUserProfile={isCurrentUserProfile}
            profileData={profileData}
            handleSettingOpen={handleSettingOpen}
            sageID={sageID ? sageID : null}
          />

          {isCurrentUserProfile && <UserStoryFilter />}

          <AutoLoadContainer
            stories={stories}
            error={storiesError}
            isLoading={isStoriesLoading}
            isUser={isCurrentUserProfile}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            message={'No more stories found.'}
          />
        </>
      )}

      <Navigator />

      <AnimatePresence>
        {settingOpen && <Setting handleSettingOpen={handleSettingOpen} />}
      </AnimatePresence>

    </>
  )
}
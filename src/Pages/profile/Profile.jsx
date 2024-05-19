import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Custom Hooks
import { useFetchUserData } from '../../Hooks/Fetches/useFetchUserData';
import { useFetchStories } from '../../Hooks/Fetches/useFetchStories';

// Redux
import { uid } from '../../Redux/slice/UserAuthSlice';
import { currentVisibility } from '../../Redux/slice/ProfileVisibilitySlice';

// UI Components
import { Navigator } from '../../Components/Common/Navigator';
import { Header } from '../../Components/Common/Header';
import { Setting } from '../../Components/Profile/Settings/Setting';
import { ProfileDetail } from '../../Components/Profile/ProfileDetail';
import { ProfileStoryFilter } from '../../Components/Profile/ProfileStoryFilter';
import { Loader } from '../../Components/Common/Loader';
import { Error } from '../../Components/Common/Error';
import { AutoLoadContainer } from '../../Components/Containers/AutoLoadContainer';

export function Profile() {
  const { sageID } = useParams();
  const userUID = useSelector(uid);
  const folder = useSelector(currentVisibility);
  const [settingOpen, isSettingOpen] = useState(false);
  const isCurrentUserProfile = !sageID || sageID === userUID;
  const handleSettingOpen = () => isSettingOpen(prev => !prev);

  const {
    userData: profileData,
    userDataError: profileDataError,
    isUserDataLoading: isProfileDataLoading
  } = useFetchUserData({ userID: sageID || userUID })

  const {
    stories,
    storiesError,
    isStoriesLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useFetchStories({
    user: isCurrentUserProfile ? userUID : sageID,
    visibility: isCurrentUserProfile ? folder : 'public'
  })

  return (
    <>
      <Header />

      {isProfileDataLoading && <Loader isCenter={true} />}

      {profileDataError && <Error message={userDataError.message} />}

      {profileData && (
        <>
          <ProfileDetail
            isCurrentUserProfile={isCurrentUserProfile}
            profileData={profileData}
            handleSettingOpen={handleSettingOpen}
            sageID={sageID ? sageID : null}
          />

          {isCurrentUserProfile && <ProfileStoryFilter />}

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
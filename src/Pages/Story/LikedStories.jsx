import React from 'react';

// Custom Hooks
import useFetchUserData from '../../hooks/fetch/useFetchUserData';
import useFetchWithID from '../../hooks/fetch/useFetchWithID';

// UI Components
import Loader from '../../Components/Common/Loader';
import Error from '../../Components/Common/Error';
import Header from '../../Components/Common/Header';
import ManualLoadContainer from '../../Components/Containers/ManualLoadContainer';

export default function LikedStories() {
  const { userData, userDataError, isUserDataLoading } = useFetchUserData({ isPrivate: true });

  const reversedLikedArray =  userData && (userData.liked ? [...userData.liked].reverse() : [])

  const { data: stories, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useFetchWithID('liked', reversedLikedArray);

  function renderContent() {
    if (isLoading || isUserDataLoading) return <Loader isCenter={true} />;
    if (error || userDataError) return <Error message={error.message || userDataError.message} />;
    return (
      <ManualLoadContainer
        data={stories}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    )
  }

  return (
    <>
      <Header back={true} />
      {renderContent()}
    </>
  )
}
import React from 'react';

// Custom Hooks
import { useFetchUserData } from '../../Hooks/Fetches/useFetchUserData';
import { useFetchWithID } from '../../Hooks/Fetches/useFetchWithID';

// UI Components
import { Loader } from '../../Components/Common/Loader';
import { Error } from '../../Components/Common/Error';
import { Header } from '../../Components/Common/Header';
import { ManualLoadContainer } from '../../Components/Containers/ManualLoadContainer';

export function LikedStories() {
  const { userData, userDataError, isUserDataLoading } = useFetchUserData({ isPrivate: true });

  const reversedLikedArray = userData && (userData.liked ? [...userData.liked].reverse() : [])

  const { data: stories, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useFetchWithID({type:'liked', idsArray: reversedLikedArray, fetchFromCollection: 'stories'});

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
import React from 'react';

// Custom Hooks
import { useFetchUserData } from '../../Hooks/Fetches/useFetchUserData';
import { useFetchWithID } from '../../Hooks/Fetches/useFetchWithID';

// UI Components
import { Header } from '../../Components/Common/Header';
import { Loader } from '../../Components/Common/Loader';
import { Error } from '../../Components/Common/Error';
import { ManualLoadContainer } from '../../Components/Containers/ManualLoadContainer';

export function SavedStories() {
  const { userData, userDataError, isUserDataLoading } = useFetchUserData({ isPrivate: true })

  const reversedSavedArray = userData && (userData.saved ? [...userData.saved].reverse() : []);

  const { data: stories, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useFetchWithID({type:'saved', idsArray: reversedSavedArray, fetchFromCollection: 'stories'});

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

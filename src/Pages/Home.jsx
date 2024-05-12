import React from 'react';

// Custom Hooks
import useFetchStories from '../hooks/fetch/useFetchStories';

// UI Components
import Navigator from '../Components/Common/Navigator';
import Header from '../Components/Common/Header';
import AutoLoadContainer from '../Components/Containers/AutoLoadContainer';

export default function Home() {
  const {
    stories,
    storiesError,
    isStoriesLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useFetchStories({ user: null, visibility: 'public' });

  return (
    <>
      <Header />
      <AutoLoadContainer
        isLoadingCenter={true}
        stories={stories}
        isLoading={isStoriesLoading}
        error={storiesError}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        message={"Story time's up! Stay tuned for new tales!"}
      />
      <Navigator />
    </>
  )
}
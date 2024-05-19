import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useInfiniteQuery } from "react-query";
import { fireStoreDb } from "../../../Firebase";

export function useFetchStories({ user, visibility }) {
  const getStories = async ({ pageParam }) => {
    const docsLimit = 6;

    if (pageParam === null) {
      return { data: [], hasNextPage: null }
    }

    const collectionRef = collection(fireStoreDb, 'stories');

    let storiesQuery = query(
      collectionRef,
      where('visibility', '==', visibility),
      orderBy('createdOn', 'desc'),
      limit(docsLimit)
    )

    if (user) {
      storiesQuery = query(storiesQuery, where('authorID', '==', user))
    }

    if (pageParam) {
      storiesQuery = query(storiesQuery, startAfter(pageParam))
    }

    const snapShot = await getDocs(storiesQuery);

    if (snapShot.empty) {
      return { data: [], hasNextPage: null }
    }
    const lastDoc = snapShot.docs.length >= 6 ? snapShot.docs[snapShot.docs.length - 1] : null;
    const data = snapShot.docs.map(doc => doc.data());
    return { data, lastDoc }
  };

  const {
    data: stories,
    error: storiesError,
    isLoading: isStoriesLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery(user ? [user, visibility] : 'homePageStories', getStories, {
    getNextPageParam: (lastPageParam) => lastPageParam.lastDoc,
    enabled: (!!user && !!visibility) || !!visibility,
    staleTime: 60 * 60 * 1000
  })

  return { stories, storiesError, isStoriesLoading, hasNextPage, isFetchingNextPage, fetchNextPage };
}

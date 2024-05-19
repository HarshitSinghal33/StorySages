import { collection, getDocs, limit, where, query } from "firebase/firestore"
import { useInfiniteQuery } from "react-query"
import { fireStoreDb } from '../../../Firebase'

export function useFetchWithID({type, idsArray, fetchFromCollection}) {
    const collectionRef = collection(fireStoreDb, fetchFromCollection);
    const fetchDocuments = async (pageParam) => {
        const docLimit = 6;

        const nullData = { data: [], lastPageParam: null }

        if (idsArray.length === 0 || !pageParam ) return nullData;

        let documentQuery = query(collectionRef, limit(docLimit))

        const slicedFetchIdsArray = pageParam === 1 ? idsArray.slice(0, docLimit) : idsArray.slice((pageParam - 1) * docLimit, (pageParam * docLimit) + 1)
        if (slicedFetchIdsArray.length === 0) return nullData;

        if (fetchFromCollection === 'users') {
            documentQuery = query(documentQuery, where('id', 'in', slicedFetchIdsArray));
        }else{
            documentQuery = query(documentQuery, where('storyID', 'in', slicedFetchIdsArray), where('visibility', '==', 'public'))
        }

        const snapShot = await getDocs(documentQuery)

        if (snapShot.empty) return nullData;

        const usersMap = new Map();
        snapShot.forEach(doc => {
            usersMap.set(doc.id, doc.data());
        });

        const data = idsArray.map(id => usersMap.get(id)).filter(story => story);

        const lastPageParam = snapShot.docs.length >= docLimit ? pageParam + 1 : null

        return { data, lastPageParam }
    }

    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: type,
        queryFn: ({ pageParam = 1 }) => fetchDocuments(pageParam),
        getNextPageParam: (lastPage) => lastPage.lastPageParam,
        staleTime: Infinity,
        enabled: !!type && !!idsArray
    })

    return { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage }
}
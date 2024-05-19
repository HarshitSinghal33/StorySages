import { getDoc, doc } from "firebase/firestore"
import { useQuery } from "react-query"
import { fireStoreDb } from "../../../Firebase"

export function useFetchStory({ storyID, isStory }) {
    const fetchDocument = async () => {
        const docSnapShot = await getDoc(doc(fireStoreDb, 'stories', storyID));

        if (!docSnapShot.exists) return null;

        return docSnapShot.data()
    }

    const { data, error, isLoading } = useQuery(storyID, fetchDocument, {
        staleTime: 60 * 60 * 1000,
        enabled: !Boolean(isStory) && !!storyID 
    })

    return { data, error, isLoading }
}
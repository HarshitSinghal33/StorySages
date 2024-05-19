import { useSelector } from 'react-redux'
import { uid } from '../../Redux/slice/UserAuthSlice'
import { useQuery } from 'react-query';
import { getDoc, doc } from 'firebase/firestore';
import { fireStoreDb } from '../../../Firebase';

export function useFetchUserData({isPrivate = false, userID}) {
    const userUID = useSelector(uid);
    
    const fetchDocument = async () => {
        const docRef = isPrivate
            ? doc(fireStoreDb, 'users', userUID, 'private', 'privateData')
            : doc(fireStoreDb, 'users', userID)

        const docSnapShot = await getDoc(docRef)

        if (!docSnapShot.exists()) {
            return null
        }
        
        return docSnapShot.data()
    }

    const { data: userData, error: userDataError, isLoading: isUserDataLoading } = useQuery(isPrivate ? 'private' : userID, fetchDocument, {
        staleTime: 60 * 60 * 1000,
        enabled : isPrivate ? !!userUID : !!userID
    })

    return { userData, userDataError, isUserDataLoading }
}
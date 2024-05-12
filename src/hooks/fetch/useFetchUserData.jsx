import { useSelector } from 'react-redux'
import { userUID } from '../../Redux/slice/AuthSlice'
import { useQuery } from 'react-query';
import { getDoc, doc } from 'firebase/firestore';
import { fireStoreDb } from '../../../Firebase';
export default function useFetchUserData({isPrivate = false, userID}) {
    const user = useSelector(userUID);
    
    const fetchDocument = async () => {
        const docRef = isPrivate
            ? doc(fireStoreDb, 'users', user, 'private', 'privateData')
            : doc(fireStoreDb, 'users', userID)

        const docSnapShot = await getDoc(docRef)

        if (!docSnapShot.exists) {
            console.log('user not found');
            return null
        }
        return docSnapShot.data()
    }

    const { data: userData, error: userDataError, isLoading: isUserDataLoading } = useQuery(isPrivate ? 'private' : userID, fetchDocument, {
        staleTime: 60 * 60 * 1000,
        enabled : isPrivate ? !!user : !!userID
    })

    return { userData, userDataError, isUserDataLoading }
}
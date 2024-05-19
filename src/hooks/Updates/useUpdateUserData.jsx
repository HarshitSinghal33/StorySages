// firebase
import { doc, writeBatch, collection, where, query, getDocs } from "firebase/firestore"
import { fireStoreDb } from "../../../Firebase";

// react-query
import { useQueryClient } from "react-query";

// redux
import { useSelector } from "react-redux";
import { uid } from "../../Redux/slice/UserAuthSlice";

// component
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useUpdateUserData() {
  const navigate = useNavigate()
  const userUID = useSelector(uid)
  const queryClient = useQueryClient()
  const setUserData = async (data) => {
    const batch = writeBatch(fireStoreDb)
    try {
      const collectionRef = collection(fireStoreDb, 'stories')
      const snapShot = await getDocs(
        query(collectionRef,
          where('authorID', '==', userUID),
          where('visibility', 'in', ['public', 'unlisted', 'private', 'draft'])
        )
      )

      if (!snapShot.empty) {
        snapShot.docs.forEach(story => {
          batch.update(doc(fireStoreDb, 'stories', story.id), { author: data.name, authorProfile: data.profile })
        })
      }
      batch.update(doc(fireStoreDb, 'users', userUID), data)

      await batch.commit();
      queryClient.invalidateQueries();
      toast.info('Update Successful')
      navigate('/profile')
    } catch (error) {
      console.log(error);
      toast.error(`Error Occurred : ${error.message}`);
    }

  }
  return { setUserData }
}
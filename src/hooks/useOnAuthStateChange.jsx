import { useEffect, useState } from 'react'

// redux
import { setCurrentUserUID } from '../Redux/slice/UserAuthSlice'
import { useDispatch } from 'react-redux'

// firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../Firebase'

export function useOnAuthStateChange() {
    const [isEmailVerified, setIsEmailVerified] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            
            if (user) {
                dispatch(setCurrentUserUID(user.uid));
                if (!user.emailVerified) {
                    
                    const currentTime = new Date().getTime()
                    const notificationReminderTimer = localStorage.getItem('notificationReminderTimer');

                    // if verificationReminderTimer is not found or currentTime is greater than verificationReminderTimer than show email verify modal

                    if(!notificationReminderTimer || currentTime > Number(notificationReminderTimer)){
                        setIsEmailVerified(false)
                        // remind after 3 days
                        localStorage.setItem('notificationReminderTimer', currentTime + (3 * 24 * 60 * 60 * 1000))
                    }
                }
            }
        })
        return () => {unsubscribe(), setIsEmailVerified(null)}
    }, [])
    return { isEmailVerified }
}
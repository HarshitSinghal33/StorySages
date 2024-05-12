import { useEffect, useState } from 'react'

export default function useScroll() {
    const [isEnd, setIsEnd] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
                setIsEnd(true);
            }else{
                setIsEnd(false)
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return  isEnd ;
}
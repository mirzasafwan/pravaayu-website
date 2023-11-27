import { useState, useEffect } from 'react';
const hasWindow = typeof window !== 'undefined';



export default function useWindowDimensions() {
    function getWindowDimensions() {
        const width = hasWindow ? 400 : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height
        };
    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
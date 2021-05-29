import React,{useEffect, useState} from 'react';

export function useWindowWidthSize() {

    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
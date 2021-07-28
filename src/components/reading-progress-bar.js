import React from 'react'
import { useEffect, useState } from 'react';

export default function ReadingProgress ({ target }) {
    const [readingProgress, setReadingProgress] = useState(0);
    const scrollListener = () => {
        if (!target.current) return

        const element = target.current
        const totalHeight = element.clientHeight - element.offsetTop - (window.innerHeight) + 230
        const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

        if (windowScrollTop === 0) return setReadingProgress(0)

        if (windowScrollTop > totalHeight) return setReadingProgress(100)

        setReadingProgress((windowScrollTop / totalHeight) * 100)
    };
    
    useEffect(() => {
        window.addEventListener("scroll", scrollListener)
        return () => window.removeEventListener("scroll", scrollListener)
    })
    
    return <div
        className={`bg-pink-500 ${readingProgress < 100 ? 'rounded ' : ''}rounded-l-none sticky`}
        style={{
            width: `${readingProgress}%`,
            height: '0.3em',
            top: 0,
            zIndex:1000
        }}
    />
}


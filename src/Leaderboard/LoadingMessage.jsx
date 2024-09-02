import { useEffect, useState } from 'react';

import loadingMessages from '../assets/loadingMessages.json'

export default function LoadingMessage() {
    const getRandomLoadingMessage = () => {
        return loadingMessages[Math.floor(Math.random() * loadingMessages.length
        )]
    }
    const [loadingMessage, setLoadingMessage] = useState(getRandomLoadingMessage());

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingMessage(getRandomLoadingMessage());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <h3>{loadingMessage}</h3>
    );
}
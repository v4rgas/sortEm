import { useEffect, useState } from "react";

export default function Time({ started, paused }) {
    const [elapsedTime, setElapsedTime] = useState(0);
    useEffect(
        () => {
            const interval = setInterval(() => {
                if (paused)
                    return;

                if (!started) {
                    setElapsedTime(0);
                    clearInterval(interval);
                } else
                    setElapsedTime((time) => time + 1);

            }, 10);
            return () => clearInterval(interval);
        }, [started, paused]
    )
    return (
        <div>
            <h1>{(elapsedTime / 100).toFixed(3)}</h1>
        </div>
    )
}
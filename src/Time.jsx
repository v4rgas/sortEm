import { useEffect, useState } from "react";

import { useSetAtom } from "jotai";
import { userTimesAtom } from "./atoms";

export default function Time({ started, ended }) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const setUserTimes = useSetAtom(userTimesAtom);

    useEffect(() => {
        console.log(started, ended);
        if (!started) {
            setElapsedTime(0);
            return;
        }

        if (ended) {
            setUserTimes((times) => [...times, elapsedTime]);
            return
        }

        const updateElapsedTime = () => {
            setElapsedTime((time) => time + 1);
        };

        const interval = setInterval(updateElapsedTime, 10);


        return () => clearInterval(interval);
    }, [started, ended]);

    return <h1>{(elapsedTime / 100).toFixed(2)}</h1>;
}

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { userTimesAtom, usernameAtom } from "./atoms";

import useApi from "./useApi";

export default function Time({ started, ended }) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startingTime, setStartingTime] = useState(null);
    const setUserTimes = useSetAtom(userTimesAtom);
    const username = useAtomValue(usernameAtom);
    const { postTime } = useApi();

    useEffect(() => {
        console.log(started, ended);

        if (started && ended) {
            postTime(username, elapsedTime)
        }

        if (!started) {
            setElapsedTime(0);
            setStartingTime(null);
            return;
        }

        if (started && !startingTime) {
            setStartingTime(Date.now());
        }

        if (ended) {
            setUserTimes((times) => [...times, elapsedTime]);
            return
        }

        const updateElapsedTime = () => {
            if (startingTime !== null) {
                setElapsedTime(Date.now() - startingTime);
            }
        };

        const interval = setInterval(updateElapsedTime, 10);


        return () => clearInterval(interval);
    }, [started, ended]);




    return <h1>{(elapsedTime / 1000).toFixed(2)}</h1>;
}

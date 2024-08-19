import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { userTimesAtom, usernameAtom } from "./atoms";

import useApi from "./useApi";

export default function Time({ started, ended }) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const setUserTimes = useSetAtom(userTimesAtom);
    const username = useAtomValue(usernameAtom)
    const { postTime } = useApi();

    useEffect(() => {
        console.log(started, ended);

        if (started && ended) {
            postTime(username, elapsedTime)
        }

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

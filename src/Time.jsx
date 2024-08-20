import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { themeAtom, userTimesAtom, usernameAtom } from "./atoms";

import useApi from "./useApi";

export default function Time({ started, ended }) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startingTime, setStartingTime] = useState(null);
    const setUserTimes = useSetAtom(userTimesAtom);
    const username = useAtomValue(usernameAtom);
    const theme = useAtomValue(themeAtom);
    const { postTime } = useApi();

    // let theme = document.body.getAttribute('data-theme');


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
    }, [started, ended, startingTime]);


    const redness = Math.min(255, Math.floor((elapsedTime / 1000) * 255 / 35));

    let rgb;
    if (theme == 'light') {
        rgb = [redness, 0, 0];
    }
    else {
        rgb = [255, 255 - redness, 255 - redness];
    }
    const rgbString = `rgb(${rgb.join(',')})`;
    // console.log(rgbString);



    return <h1 style={{ color: rgbString }}>{(elapsedTime / 1000).toFixed(2)}</h1>;
}

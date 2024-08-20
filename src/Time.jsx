import { themeAtom, userTimesAtom, usernameAtom } from "./atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import useApi from "./useApi";

export default function Time({ started, ended }) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startingTime, setStartingTime] = useState(null);
    const setUserTimes = useSetAtom(userTimesAtom);
    const username = useAtomValue(usernameAtom);
    const theme = useAtomValue(themeAtom);
    const { postTime } = useApi();
    const { getBestTime } = useApi();

    // let theme = document.body.getAttribute('data-theme');

    const [bestTime, setBestTime] = useState(35);

    useEffect(() => {
        getBestTime().then((data) => {
            setBestTime(data.time / 1000);
            console.log(data)
        });
    }, []);



    useEffect(() => {
        console.log(started, ended);

        if (started && ended) {
            postTime(username, elapsedTime)
            getBestTime(10).then((data) => {
                if (data.time > elapsedTime) {
                    alert('Your time was AMAZING, your time will be manually reviewed and added to the leaderboard');
                }

            });
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


    const redness = Math.min(255, Math.floor((elapsedTime / 1000) * 255 / bestTime));

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

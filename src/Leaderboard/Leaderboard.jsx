import './Leaderboard.css';

import { BrowserView, MobileOnlyView } from "react-device-detect";
import { useEffect, useState } from "react";

import HallOfShameTable from './HallOfShameTable';
import LeaderboardTable from "./LeaderboardTable";
import useApi from "../useApi";
import { useKeyboard } from "../BaseGame/useKeyboard";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

export default function Leaderboard() {
    const { getLeaderboard, getAllUsernames, getWorstPlayers, getTodaysTop10 } = useApi();
    const [leaderboard, setLeaderboard] = useState([]);
    const [worstPlayers, setWorstPlayers] = useState([]);
    const [players, setUsernames] = useState([]);
    const [todaysTop10, setTodaysTop10] = useState([])


    const navigate = useNavigate()


    useEffect(() => {
        getLeaderboard().then((data) => {
            setLeaderboard(data);
        });
        getAllUsernames().then((data) => {
            setUsernames(data);
        });
        getWorstPlayers().then((data) => {
            setWorstPlayers(data);
        });
        getTodaysTop10().then((data) => {
            setTodaysTop10(data);
        })
    }, []);

    useKeyboard({
        key: " ",
        preventRepeat: true,
        onKeyPressed: () => {
            navigate("/");
        }
    });

    const { ref } = useSwipeable({
        onSwipedUp: () => {
            navigate("/");
        },
        delta: 300,
    });

    useEffect(() => {
        ref(document);
        return () => {
            ref({});
        }
    }
    )



    return (

        <div className='center'>
            <MobileOnlyView>
                <span>Long swipe up to go back</span>
            </MobileOnlyView>
            <BrowserView>
                <span>Press space to go back</span>
            </BrowserView>

            <h1>Top 50</h1>

            <LeaderboardTable dataToDisplay={leaderboard} />

            <h1>Today's Top 10</h1>
            <LeaderboardTable dataToDisplay={todaysTop10} />

            <h1>Hall of Shame</h1>
            <HallOfShameTable dataToDisplay={worstPlayers} />

            <h2>Celebrating the Most Amazing Players!</h2>
            <div className="usernames">
                {players.map(({ username }, i) => (
                    username + " "
                ))}
            </div>

            <h3>thank you for playing {"<3"}, <a
                href={Math.random() > 0.5 ? "https://www.youtube.com/watch?v=CFVKdbiw9JE" : "https://github.com/v4rgas"}
                target='_blank'>
                juan</a></h3>


        </div >
    );
}

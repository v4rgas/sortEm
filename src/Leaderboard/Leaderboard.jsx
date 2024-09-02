import './Leaderboard.css';

import { BrowserView, MobileOnlyView } from "react-device-detect";
import { Fragment, useEffect, useState } from "react";

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
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate()


    useEffect(() => {
        setLoading(true);
        getLeaderboard().then((data) => {
            setLeaderboard(data);
            setLoading(false);
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

    useKeyboard({
        key: ["J", "j", 'ArrowDown'],
        preventRepeat: false,
        onKeyPressed: () => {
            window.scrollBy({ top: 200, behavior: 'smooth' });
        }
    });

    useKeyboard({
        key: ["K", "k", 'ArrowUp'],
        preventRepeat: false,
        onKeyPressed: () => {
            window.scrollBy({ top: -200, behavior: 'smooth' });
        }
    });

    const { ref } = useSwipeable({
        onSwipedLeft: () => {
            navigate("/");
        },
        onSwipedRight: () => {
            navigate("/");
        },
    });

    useEffect(() => {
        ref(document);
        return () => {
            ref({});
        }
    }
    )



    return (
        <Fragment>
            {loading ? <div className='center'>Loading...</div> :

                <div className='center'>
                    <MobileOnlyView>
                        <span>Swipe left or right to go back</span>
                    </MobileOnlyView>
                    <BrowserView>
                        <span>Press space to go back <br />
                            Scroll: J,K or ↑,↓</span>
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
                        href="https://github.com/v4rgas"
                        target='_blank'>
                        juan</a></h3>

                    <h2>Contributors</h2>
                    <span>backend contribution: <a href="https://github.com/BrunoFarfan" target='_blank'>bruno</a> </span>
                    <span>dark mode: <a href="https://github.com/ElTioAndresCabezas" target='_blank'>andrés</a></span>


                </div >
            }
        </Fragment>
    );
}

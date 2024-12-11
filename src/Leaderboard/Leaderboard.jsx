import './Leaderboard.css';

import { BrowserView, MobileOnlyView } from "react-device-detect";
import { Fragment, useEffect, useState } from "react";

import HallOfShameTable from './HallOfShameTable';
import LeaderboardTable from "./LeaderboardTable";
import LoadingMessage from './LoadingMessage';
import useApi from "../useApi";
import { useKeyboard } from "../BaseGame/useKeyboard";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [worstPlayers, setWorstPlayers] = useState([]);
    const [players, setUsernames] = useState([]);
    const [todaysTop10, setTodaysTop10] = useState([])
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate()



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
            {loading ? <LoadingMessage /> :

                <div className='center'>
                    <MobileOnlyView>
                        <span>Swipe left or right to go back</span>
                    </MobileOnlyView>
                    <BrowserView>
                        <span>Press space to go back <br />
                            Scroll: J,K or ↑,↓</span>
                    </BrowserView>

                    <h1></h1>
                    
                    <p>
                        I'm no longer maintaining this project, but you can still play it, share it with your friends and even contribute if you want to.
                        Feel free to reach out to me if you have any questions or suggestions. <br /> <br />

                        I'm incredibly grateful for all the support and feedback I've received from you guys.
                        I'm glad you enjoyed the game and I hope you had a good time playing it.
                    </p>
                    
                    

                    <h3>thank you for playing {"<3"}, <a
                        href="https://github.com/v4rgas"
                        target='_blank'>
                        juan</a></h3>

                    <h4>Contributors</h4>
                    <span>backend contribution: <a href="https://github.com/BrunoFarfan" target='_blank'>bruno</a> </span>
                    <span>dark mode: <a href="https://github.com/ElTioAndresCabezas" target='_blank'>andrés</a></span>


                </div >
            }
        </Fragment>
    );
}

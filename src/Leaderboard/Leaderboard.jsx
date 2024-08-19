import { BrowserView, MobileOnlyView } from "react-device-detect";
import { useEffect, useState } from "react";

import LeaderboardTable from "./LeaderboardTable";
import useApi from "../useApi";
import { useKeyboard } from "../BaseGame/useKeyboard";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

export default function Leaderboard() {
    const { getLeaderboard } = useApi();
    const [leaderboard, setLeaderboard] = useState([]);

    const navigate = useNavigate()


    useEffect(() => {
        getLeaderboard().then((data) => {
            setLeaderboard(data);
            console.log(data);
        });
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
        }
    });

    useEffect(() => {
        ref(document);
        return () => {
            ref({});
        }
    }
    )



    return (
        <div>
            <MobileOnlyView>
                <span>Long swipe up to go back</span>
            </MobileOnlyView>
            <BrowserView>
                <span>Press space to go back</span>
            </BrowserView>

            <h1>Leaderboard</h1>

            <LeaderboardTable dataToDisplay={leaderboard} />
        </div >
    );
}
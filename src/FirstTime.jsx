import './FirstTime.css'

import { BrowserView, MobileOnlyView } from "react-device-detect"
import { useEffect, useState } from "react"

import { useKeyboard } from "./BaseGame/useKeyboard"
import { useSetAtom } from "jotai"
import { useSwipeable } from "react-swipeable"
import { usernameAtom } from "./atoms"

export default function FirstTime() {
    const setUsername = useSetAtom(usernameAtom)
    const [userInput, setUserInput] = useState("")

    const checkAndSetUsername = () => {
        if (userInput !== "") {
            setUsername(userInput)
        }
    }

    useKeyboard({
        key: "Enter",
        preventRepeat: true,
        onKeyPressed: checkAndSetUsername
    });

    const { ref } = useSwipeable({
        onSwipedRight: checkAndSetUsername,
    });

    useEffect(() => {
        ref(document);
        return () => {
            ref({});
        }
    })

    return (
        <>
            <MobileOnlyView>
                <span>Swipe right to set your username.<br /></span>
            </MobileOnlyView>
            <BrowserView>
                <span>Press enter to set your username.<br /></span>
            </BrowserView>

            <input
                type="text"
                className="username-input"
                placeholder="Enter your username"
                onChange={(e) => setUserInput(e.target.value)}
            />
        </>
    )
}
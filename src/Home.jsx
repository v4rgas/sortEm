import App from "./App"
import FirstTime from "./FirstTime"
import { useAtomValue } from "jotai"
import { usernameAtom } from "./atoms"

export default function Home() {
    const username = useAtomValue(usernameAtom)
    return (
        username !== "" ? <App /> : <FirstTime />
    )
}

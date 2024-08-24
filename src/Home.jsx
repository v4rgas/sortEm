import App from "./App"
import FirstTime from "./FirstTime"
import useApi from "./useApi"
import { useAtomValue } from "jotai"
import { useSearchParams } from "react-router-dom"
import { usernameAtom } from "./atoms"

export default function Home() {

    const [searchParams,] = useSearchParams()
    const referral = searchParams.get("r")

    const { postReferral } = useApi()

    if (referral)
        postReferral(referral)



    const username = useAtomValue(usernameAtom)
    return (
        username !== "" ? <App /> : <FirstTime />
    )
}

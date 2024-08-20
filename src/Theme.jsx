import React from "react";
import { themeAtom } from "./atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
export default function Theme({ children }) {
    const [themeStorage, setThemeStorage] = useAtom(themeAtom);
    useEffect(() => {
        document.body.setAttribute('data-theme', themeStorage);
    }, [themeStorage]);

    return (
        <React.Fragment>
            {children}
        </React.Fragment>

    )



}
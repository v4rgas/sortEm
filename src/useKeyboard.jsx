import { useEffect } from "react";

export function useKeyboard({
    key,
    onKeyPressed,
}) {

    useEffect(() => {
        function keyDownHandler(e) {
            if (!key) {
                onKeyPressed();
            }
            if (e.key === key) {
                e.preventDefault();
                onKeyPressed();
            }
        }

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);

        };
    }, []);
}




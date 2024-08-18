import { useEffect } from "react";

export function useKeyboard({
    key,
    onKeyPressed,
    preventRepeat = false,
}) {

    useEffect(() => {
        function keyDownHandler(e) {
            if (preventRepeat && e.repeat) {
                return;
            }
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




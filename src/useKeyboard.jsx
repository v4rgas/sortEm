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

            if (Array.isArray(key)) {
                if (key.includes(e.key)) {
                    e.preventDefault();
                    onKeyPressed(e.key);
                }
            } else {
                if (!key) {
                    onKeyPressed(e.key);
                }
                if (e.key === key) {
                    e.preventDefault();
                    onKeyPressed(e.key);
                }
            }
        }

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, [key, onKeyPressed, preventRepeat]);
}

import { atomWithStorage } from "jotai/utils";

export const usernameAtom = atomWithStorage("username", "");
export const userTimesAtom = atomWithStorage("userTimes", []);
export const themeAtom = atomWithStorage("themeStorage", window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
export const mutedAtom = atomWithStorage("muted", false);

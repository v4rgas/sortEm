import { atomWithStorage } from "jotai/utils";

export const usernameAtom = atomWithStorage("username", "");
export const userTimesAtom = atomWithStorage("userTimes", []);

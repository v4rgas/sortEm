import moonLight from './assets/moon-white.svg';
import sun from './assets/sun.svg';
import { themeAtom } from './atoms';
import { useAtom } from "jotai";
import { useEffect } from 'react';

export default function DarkModeButton() {
    const [themeStorage, setThemeStorage] = useAtom(themeAtom);
    const toggleDarkMode = (e) => {
        setThemeStorage(e.target.checked ? 'dark' : 'light');
    }

    useEffect(() => {
        document.body.setAttribute('data-theme', themeStorage);
    }, [themeStorage]);


    return (
        <label className='dark-mode-toggle'>
            <img className='dark-mode-moon' src={themeStorage === 'dark' ? moonLight : sun} />
            <input className='hidden-checkbox' type='checkbox' onChange={toggleDarkMode} checked={themeStorage === 'dark'}></input>
        </label>
    );
}
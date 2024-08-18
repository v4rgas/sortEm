import './NumberBlock.css';

import Number from "./Number"
import clsx from 'clsx';

export default function NumberBlock({ numbers, selected, hovered }) {
    return (
        <div className={
            clsx(
                'number-block',
                {
                    'selected': selected,
                    'hovered': hovered
                }
            )
        }>
            {numbers?.map((number, index) => (
                <Number key={index} value={number}></Number>
            ))}
        </div>
    )
}
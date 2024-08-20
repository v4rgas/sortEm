import './HallOfShameTable.css';
export default function HallOfShameTable({ dataToDisplay }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>username</th>
                    <th>time</th>
                </tr>
            </thead>
            <tbody>
                {dataToDisplay.map((obj, i) => {
                    const tdClass = i < 3 ? `loser-td` : '';
                    return (
                        <tr key={i} className={i < 3 ? `player-${i}-worst` : 'player-regular'} >
                            <td className={tdClass}>{obj.username}</td>
                            <td className={tdClass}>{(obj.time / 1000).toFixed(3)} {i < 3 ? '??' : ''}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table >
    );
}

import './LeaderboardTable.css';
export default function LeaderboardTable({ dataToDisplay }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>username</th>
                    <th>time</th>
                </tr>
            </thead>
            <tbody>
                {dataToDisplay?.filter(({ time }) => time > 9394).map((obj, i) => {
                    const tdClass = i < 3 ? `winner-td` : '';
                    return (
                        <tr key={i} className={i < 3 ? `player-${i}` : 'player-regular'} >
                            <td className={tdClass}>{obj.username}</td>
                            <td className={tdClass}>{(obj.time / 1000).toFixed(3)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table >
    );
}

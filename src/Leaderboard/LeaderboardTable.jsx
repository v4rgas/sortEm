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
                {dataToDisplay?.map((obj, i) => {
                    return (
                        <tr key={i}>
                            <td>{obj.username}</td>
                            <td>{(obj.time / 1000).toFixed(3)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

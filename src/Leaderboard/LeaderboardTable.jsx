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
                            <td>{(obj.time / 100).toFixed(2)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
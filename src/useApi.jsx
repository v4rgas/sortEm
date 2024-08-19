export default function useApi() {
    function postTime(username, time) {
        return fetch('https://sortem.sacowea.cl/api/leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, time, moves: 0 }),
        });
    }

    async function getLeaderboard() {
        const response = await fetch('https://sortem.sacowea.cl/api/leaderboard', {
            method: 'GET',
        })
        const data = await response.json();

        return data;


    }

    return { postTime, getLeaderboard };


}
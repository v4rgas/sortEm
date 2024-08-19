import useCrypto from "./useCrypto";

function generateMockLeaderboard(numPlayers) {
    const players = [];
    for (let i = 1; i <= numPlayers; i++) {
        players.push({
            username: `Player${i}`,
            time: Math.floor(Math.random() * 30000) + 10000, // Random time between 1 and 1000
            moves: Math.floor(Math.random() * 100) + 1, // Random moves between 1 and 100
        });
    }
    return players;
}

export default function useApi() {
    const { encrypt } = useCrypto();
    async function postTime(username, time) {
        if (import.meta.env.DEV) {
            console.log('Mock postTime:', { username, time });
            return Promise.resolve({ status: 'success', message: 'Time posted (mock)' });
        }
        const x = await encrypt(JSON.stringify({ username, time, moves: 0 }));
        return fetch('https://sortem.sacowea.cl/api/leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, time, moves: 0, x }),
        });
    }

    async function getLeaderboard() {
        if (import.meta.env.DEV) {
            console.log('Mock getLeaderboard');
            return Promise.resolve(generateMockLeaderboard(100));
        }
        const response = await fetch('https://sortem.sacowea.cl/api/leaderboard', {
            method: 'GET',
        });
        const data = await response.json();

        return data;
    }

    return { postTime, getLeaderboard };
}

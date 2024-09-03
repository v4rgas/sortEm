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
            console.log('Mock postTime:', { username, time, moves: 0 });
            return Promise.resolve({ status: 'success', message: 'Time posted (mock)' });
        }
        const x = await encrypt(JSON.stringify({ username, time, moves: 0 }));
        return fetch('https://sortem.sacowea.cl/api/leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, time, moves: 9999, x }),
        });
    }

    async function getLeaderboard() {
        if (import.meta.env.DEV) {
            console.log('Mock getLeaderboard');
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(generateMockLeaderboard(100));
                }, 5000);
            });
        }
        const response = await fetch('https://sortem.sacowea.cl/api/leaderboard', {
            method: 'GET',
        });
        const data = await response.json();

        return data;
    }

    async function getAllUsernames() {
        const response = await fetch('https://sortem.sacowea.cl/api/leaderboard/usernames', {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    }

    async function getNumberOfOnlinePlayers() {
        const response = await fetch('https://sortem.sacowea.cl/api/leaderboard/active', {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    }

    async function getWorstPlayers() {
        const response = await fetch('https://sortem.sacowea.cl/api/leaderboard/worst', {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    }

    async function getBestTime(pos) {
        pos = pos || 1;
        const response = await fetch('https://sortem.sacowea.cl/api/leaderboard/best?position=' + pos, {
            method: 'GET',
        });
        const data = await response.json();
        return data
    }

    async function getTotalGamesPlayed() {
        const response = await fetch('https://sortem.sacowea.cl/api/leaderboard/total', {
            method: 'GET',
        });
        const data = await response.json();
        return data
    }

    async function postReferral(referral) {
        if (import.meta.env.DEV) {
            console.log('Mock postReferral:', { referral });
            return Promise.resolve({ status: 'success', message: 'Referral posted (mock)' });
        }
        return fetch('https://sortem.sacowea.cl/api/referral', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ referral }),
        });
    }

    async function getTodaysTop10() {
        const response = await fetch('https://sortem.sacowea.cl/api/leaderboard/today', {
            method: 'GET',
        });
        const data = await response.json();
        return data
    }

    async function getLatestCommits(count) {
        const response = await fetch('https://api.github.com/repos/v4rgas/sortEm/commits?per_page=' + count, {
            method: 'GET',
        });
        const data = await response.json();
        return data
    }

    return {
        postTime,
        getLeaderboard,
        getAllUsernames,
        getNumberOfOnlinePlayers,
        getWorstPlayers,
        getBestTime,
        getTotalGamesPlayed,
        postReferral,
        getTodaysTop10,
        getLatestCommits,
    };
}

import './LatestUpdates.css'

import { Fragment, useEffect, useState } from "react";

import useApi from "../useApi";

export default function LatestUpdates() {
    const [latestCommits, setLatestCommits] = useState([]);
    const { getLatestCommits } = useApi();
    useEffect(() => {
        getLatestCommits().then(commits => setLatestCommits(commits));
        getLatestCommits().then(commits => console.log(commits));
    }
        , []);



    return (
        <div>
            <h1>Latest Updates</h1>
            <main>
                <span>
                    {latestCommits.map((update, i) => (
                        <Fragment key={i}>
                            {update.commit.author.name + ' - ' + update.commit.message}
                            <br />
                        </Fragment>
                    ))}

                </span>
            </main>
        </div >
    );
}
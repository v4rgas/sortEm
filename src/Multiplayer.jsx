import { useEffect, useState } from "react";

import { Peer } from "peerjs";
import { useParams } from "react-router-dom";

export default function Multiplayer() {
    const otherPeerId = useParams().id;
    const [peerId, setPeerId] = useState("");
    const [peer, setPeer] = useState(null);

    useEffect(() => {
        const newPeer = new Peer({ debug: 3, serializa });

        newPeer.on("open", (id) => {
            setPeerId(id);
            console.log("Peer ID:", id);
        });

        newPeer.on("error", (err) => {
            console.error("PeerJS error:", err);
        });

        setPeer(newPeer);

        return () => {
            if (peer) {
                peer.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (peer && otherPeerId && peerId) {
            console.log('Attempting to connect to ' + otherPeerId + ' from ' + peerId);
            const conn = peer.connect(otherPeerId);

            conn.on("open", () => {
                console.log("Connection established with", otherPeerId);
                conn.send("hi!");
            });

            conn.on("data", (data) => {
                console.log("Received data:", data);
            });

            conn.on("error", (err) => {
                console.error("Connection error:", err);
            });

        } else if (peer && !otherPeerId) {
            console.log('Waiting for incoming connection...');
            peer.on("connection", (conn) => {
                console.log("Incoming connection established");

                conn.on("data", (data) => {
                    console.log("Received data:", data); // Should print 'hi!'
                });

                conn.on("open", () => {
                    console.log("Connection opened, sending 'hello!'");
                    conn.send("hello!");
                });

                conn.on("error", (err) => {
                    console.error("Connection error:", err);
                });
            });
        }
    }, [peer, otherPeerId, peerId]);

    return (
        <div>
            <h1>Multiplayer</h1>
            {peerId && (
                <a href={`http://localhost:5173/sortEm/m/${peerId}`} target="_blank" rel="noopener noreferrer">
                    Share this link
                </a>
            )}
        </div>
    );
}

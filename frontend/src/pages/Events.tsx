import React, { useEffect, useState } from "react";
import { getCollectionEvents, getMintEvents } from "../api";

export const Events = () => {
    const [collectionEvents, setCollectionEvents] = useState<any>([]);
    const [mintEvents, setMintEvents] = useState<any>([]);

    useEffect(() => {
        getCollectionEvents().then((events) => {
            setCollectionEvents(events);
        });
        getMintEvents().then((events) => {
            setMintEvents(events);
        });
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div>
                <h1>NFT Collection Events</h1>
                {collectionEvents.map((event: any, index: number) => (
                    <div key={event.event+index}>
                        <p>
                            <strong>Event Name: </strong> {event.event}
                        </p>
                        <p>
                            <strong>Collection Address: </strong>{event.args[0]}
                        </p>
                        <p>
                            <strong>Collection Name: </strong>{event.args[1]}
                        </p>
                        <p>
                            <strong>Collection Symbol: </strong>{event.args[2]}
                        </p>
                        ------------------------------------------------------------
                    </div>
                ))}
            </div>
            <div>
                <h1>NFT Mint Events</h1>
                {mintEvents.map((event: any, index: number) => (
                    <div key={event.event+index}>
                        <p>
                            <strong>Event Name: </strong> {event.event}
                        </p>
                        <p>
                            <strong>Collection Address: </strong>{event.args[0]}
                        </p>
                        <p>
                            <strong>Token Owner: </strong>{event.args[1]}
                        </p>
                        <p>
                            <strong>Token ID: </strong>{event.args[2].hex}
                        </p>
                        <p>
                            <strong>Token URL: </strong>{event.args[3]}
                        </p>
                        ------------------------------------------------------------
                    </div>
                ))}
            </div>
        </div>
    );
}
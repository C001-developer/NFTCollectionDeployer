import React, { FormEvent, useEffect, useState } from 'react';
import { createToken } from '../api/web3';
import { getCollections } from '../api';

export const Tokens: React.FC = () => {
    const [tokenURL, setTokenURL] = useState('');
    const [collectionAddress, setCollectionAddress] = useState('');
    const [collections, setCollections] = useState<any>([]);

    useEffect(() => {
        getCollections().then((collections) => {
            setCollections(collections);
            setCollectionAddress(collections[0]);
        });
    }, []);

    const mintToken = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await createToken(collectionAddress, tokenURL);
            console.log('Token minted:', result);
        } catch (error) {
            console.error('Error minting token:', error);
        }
    };

    return (
        <div>
            <h1>Mint Token</h1>
            <form onSubmit={mintToken}>
                <label>
                    Collection:
                    <select value={collectionAddress} onChange={(e) => setCollectionAddress(e.target.value)}>
                        {
                            collections.map((collection: any, index: number) => (
                                <option key={index} value={collection}>{collection}</option>
                            ))
                        }
                    </select>
                </label>
                <label>
                    Token URL:
                    <input type="text" value={tokenURL} onChange={(e) => setTokenURL(e.target.value)} />
                </label>
                <button type="submit">Mint Token</button>
            </form>
        </div>
    );
};
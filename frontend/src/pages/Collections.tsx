import React, { FormEvent, FormEventHandler, useState } from 'react';
import { deployCollection } from '../api/web3';

export const Collections: React.FC = () => {
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');

    const createCollection = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await deployCollection(tokenName, tokenSymbol);
            console.log('Collection created:', result);
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    };

    return (
        <div>
            <h1>Create Collection</h1>
            <form onSubmit={createCollection}>
                <label>
                    Token Name:
                    <input type="text" value={tokenName} onChange={(e) => setTokenName(e.target.value)} />
                </label>
                <label>
                    Token Symbol:
                    <input type="text" value={tokenSymbol} onChange={(e) => setTokenSymbol(e.target.value)} />
                </label>
                <button type="submit">Create Collection</button>
            </form>
        </div>
    );
};
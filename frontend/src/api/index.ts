import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getCollections = async () => {
    const collections = await axios.get(`${API_URL}/nft-collections`);
    return collections.data;
}

export const getCollectionEvents = async () => {
    const collectionEvents = await axios.get(`${API_URL}/nft-collection-events`);
    return collectionEvents.data;
}

export const getMintEvents = async () => {
    const mintEvents = await axios.get(`${API_URL}/nft-mint-events`);
    return mintEvents.data;
}



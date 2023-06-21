import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import dotenv from 'dotenv';
import abi from './abi.json';

dotenv.config();

const nftFactoryAddress = process.env.REACT_APP_NFT_FACTORY_ADDRESS || '';

export const connectWallet = async () => {
    try {
        // Request access to the user's accounts
        if (!(window as any).ethereum) {
            throw new Error('No ethereum object found');
        }
        if (!(window as any).ethereum.selectedAddress) {
            await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        }
        const web3Instance = new Web3((window as any).ethereum);
        // Get the selected account
        const accounts = await web3Instance.eth.getAccounts();
        return accounts[0];
    } catch (error) {
        throw error;
    }
}

export const deployCollection = async (name: string, symbol: string) => {
    try {
        const web3Instance = new Web3((window as any).ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        const nftCollectionFactoryABI = abi.NFTCollectionFactory;
        const nftCollectionFactory = new web3Instance.eth.Contract(
            nftCollectionFactoryABI as AbiItem[], nftFactoryAddress
        );
        const result = await nftCollectionFactory.methods.createCollection(name, symbol).send({ from: accounts[0] });
        return result;
    } catch (error) {
        throw error;
    }
}

export const createToken = async (collectionAddress: string, tokenURI: string) => {
    try {
        const web3Instance = new Web3((window as any).ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        const nftCollectionABI = abi.NFTCollection;
        const nftCollection = new web3Instance.eth.Contract(
            nftCollectionABI as AbiItem[], collectionAddress
        );
        const result = await nftCollection.methods.mintToken(accounts[0], tokenURI).send({ from: accounts[0] });
        return result;
    }
    catch (error) {
        throw error;
    }
}
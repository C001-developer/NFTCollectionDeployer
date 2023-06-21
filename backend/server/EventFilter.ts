import  { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const nftFactoryAddress = process.env.NFT_FACTORY_ADDRESS || "";
const rpcEndpoint = process.env.RPC_ENDPOINT || "";

const nftCollectionAddress: string[] = [];
const nftCollectionEvents: any[] = [];
const nftMintEvents: any[] = [];
const nftMintFilters: (any)[] = [];

export async function syncEvents() {
    if (nftFactoryAddress === "") {
        throw new Error("NFT_FACTORY_ADDRESS is not set");
    }
    if (rpcEndpoint === "") {
        throw new Error("RPC_ENDPOINT is not set");
    }

    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);

    const nftFactory = await ethers.getContractAt("NFTCollectionFactory", nftFactoryAddress, provider.getSigner());

    const filter = nftFactory.filters.CollectionCreated();

    

    let lastBlockNumber = 1;

    setInterval(async () => {
        const blockNumber = await provider.getBlockNumber();
        if (lastBlockNumber > blockNumber) {
            return;
        }

        console.log("filter: ", filter);
        const events = await nftFactory.queryFilter(filter, lastBlockNumber, blockNumber);

        console.log("events: ", events);

        for (const event of events) {
            nftCollectionEvents.push(event);
            
            const collectionAddress = event.args?.[0];
            nftCollectionAddress.push(collectionAddress);

            const collection = await ethers.getContractAt("NFTCollection", collectionAddress, provider.getSigner());
            const mintFilter = collection.filters.TokenMinted();

            nftMintFilters.push({"contract": collection, "filter": mintFilter});            
        }

        for (const mintFilter of nftMintFilters) {
            const mintEvents = await mintFilter.contract.queryFilter(mintFilter.filter, lastBlockNumber, blockNumber);
            nftMintEvents.push(...mintEvents);
        }
        
        lastBlockNumber = blockNumber + 1;
        console.log("Synced events: " + lastBlockNumber + " " + events);
    }, 2000);
}

export function getNFTCollectionAddress() {
    return nftCollectionAddress;
}

export function getNFTCollectionEvents() {
    return nftCollectionEvents;
}

export function getNFTMintEvents() {
    return nftMintEvents;
}
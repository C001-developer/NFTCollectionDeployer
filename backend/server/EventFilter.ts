import { ethers, config } from "hardhat";
import dotenv from "dotenv";
import { HttpNetworkConfig } from "hardhat/types";

dotenv.config();

const nftFactoryAddress = process.env.NFT_FACTORY_ADDRESS || "";

const nftCollectionAddress: string[] = [];
const nftCollectionEvents: any[] = [];
const nftMintEvents: any[] = [];
const nftMintFilters: (any)[] = [];

export async function syncEvents() {
    if (nftFactoryAddress === "") {
        throw new Error("NFT_FACTORY_ADDRESS is not set");
    }

    const provider = new ethers.providers.JsonRpcProvider((config.networks["goerli"] as HttpNetworkConfig).url); // you can use any network here, like `localnet` or `goerli`

    const nftFactory = await ethers.getContractAt("NFTCollectionFactory", nftFactoryAddress, provider.getSigner());

    const filter = nftFactory.filters.CollectionCreated();



    let lastBlockNumber = Number(process.env.DEPLOYED_BLOCK_NUMBER) || 1;
    let syncFlag = false;

    setInterval(async () => {
        try {
            if (syncFlag) {
                return;
            }
            syncFlag = true;
            const blockNumber = await provider.getBlockNumber();
            if (lastBlockNumber >= blockNumber) {
                syncFlag = false;
                return;
            }
            const events = await nftFactory.queryFilter(filter, lastBlockNumber, blockNumber - 1);

            for (const event of events) {
                nftCollectionEvents.push(event);

                const collectionAddress = event.args?.[0];
                nftCollectionAddress.push(collectionAddress);

                const collection = await ethers.getContractAt("NFTCollection", collectionAddress, provider.getSigner());
                const mintFilter = collection.filters.TokenMinted();

                nftMintFilters.push({ "contract": collection, "filter": mintFilter });
            }

            for (const mintFilter of nftMintFilters) {
                const mintEvents = await mintFilter.contract.queryFilter(mintFilter.filter, lastBlockNumber, blockNumber - 1);
                nftMintEvents.push(...mintEvents);
                if (mintEvents.length > 0) {
                    console.log("Minted events: " + mintEvents.length);
                }
            }

            lastBlockNumber = blockNumber;
            syncFlag = false;
            console.log("Synced events: " + lastBlockNumber + " " + events.length);
        }
        catch (error) {
            console.error(error);
        }
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
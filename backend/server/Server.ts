import dotenv from "dotenv";
import cors from "cors"
import express, { Request, Response } from "express";
import { syncEvents, getNFTCollectionAddress, getNFTCollectionEvents, getNFTMintEvents } from "./EventFilter";

dotenv.config();

const app = express();
const port = 8000;

// Enable CORS for all requests
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("NFT Collection Factory Server");
});

app.get("/factory-address", (req: Request, res: Response) => {
    res.send(process.env.NFT_FACTORY_ADDRESS || "");
});

app.get("/nft-collections", (req: Request, res: Response) => {
    res.send(getNFTCollectionAddress());
});

app.get("/nft-collection-events", (req: Request, res: Response) => {
    res.send(getNFTCollectionEvents());
});

app.get("/nft-mint-events", (req: Request, res: Response) => {
    res.send(getNFTMintEvents());
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

syncEvents();
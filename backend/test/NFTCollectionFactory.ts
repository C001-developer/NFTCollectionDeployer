import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  let Alice = ethers.Wallet.createRandom();

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNFTCollectionFactory() {
    const nftCollectionFactory_factory = await ethers.getContractFactory("NFTCollectionFactory");
    const nftCollectionFactory = await nftCollectionFactory_factory.deploy();

    await nftCollectionFactory.deployed();

    return nftCollectionFactory;
  }

  describe("Deployment", function () {
    it("nft mint check", async function () {
      const nftCollectionFactory = await deployNFTCollectionFactory();

      const collectionTx = await nftCollectionFactory.createCollection(
        "NFTCollection",
        "NFTC",
      );
      
      const res = await collectionTx.wait();
      const collectionAddress = res?.events?.find((e: any) => e.event === "CollectionCreated")?.args?.[0];
      
      expect(collectionAddress).to.not.empty;
      
      const collection = await ethers.getContractAt("NFTCollection", collectionAddress);

      const mintTx = await collection.mintToken(Alice.address, "tokenURI");
      const mintRes = await mintTx.wait();
      
      const mintEvent = mintRes?.events?.find((e: any) => e.event === "TokenMinted")?.args;

      expect(mintEvent && mintEvent[0]).to.equal(collectionAddress);
      expect(mintEvent && mintEvent[1]).to.equal(Alice.address);
      expect(mintEvent && mintEvent[2]).to.equal(1);
      expect(mintEvent && mintEvent[3]).to.equal("tokenURI");
    });
  });
});

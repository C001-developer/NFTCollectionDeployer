import { ethers } from "hardhat";

async function main() {
  const nftCollectionFactory_factory = await ethers.getContractFactory("NFTCollectionFactory");
  const nftCollectionFactory = await nftCollectionFactory_factory.deploy();

  await nftCollectionFactory.deployed();
  
  console.log("NFTCollectionFactory deployed to:", nftCollectionFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

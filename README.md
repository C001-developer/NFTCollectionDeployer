# NFTCollectionDeployer

## Hardhat Available Accounts
It can be different for your hardhat network. You can check it with `npx hardhat accounts` command.

```bash
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

## How to use

### 1. Install dependencies

```bash
make npm-install
```

### 2. Deploy the smart contract

- To deploy the smart contract in the local hardhat network, please run the following command:


```bash
# it will run the hardhat node on port 8545 and deploy the smart contract
make run-hardhat

# it will stop the hardhat node
make stop-hardhat
```

- To deploy the smart contract in the Goerli network, please run the following command:

NOTE: I've tested it in node 1.18.

```bash
make deploy-goerli
```

NOTE: Please update the `INFURA_API_KEY` and `PRIVATE_KEY` in `.env` file.


### 3. Run the server

The deployed smart contract address is `0xC40C9c4A4d5BACF4aF81188A17bA2054a2d72EE8` in Goerli. 
It can be changed in your hardhat local environment, please update `NFT_FACTORY_ADDRESS` in `backend/.env` file.

```bash
# it will run on port 8000, you can update it in .env file
make run-server 
```

### 4. Run the client

Please update the `REACT_APP_NFT_FACTORY_ADDRESS` in `frontend/.env` file.
If the server is running on a different port, please update the `REACT_APP_API_URL` in `frontend/.env` file.

```bash
# it will run on port 3000
make run-client
```

### 5. MetaMask configuration

- Connect to the local network (http://localhost:8545, ChainID: 31337) if you are using the hardhat local network or the Goerli test network.
- Import the private key of the above list if you are using the hardhat local network.
- Note: if the nonce is mismatched, you can reset the account in the MetaMask settings by `Clear activity tab data`.

### 6. Interact with the client

- `Events` tab: list the events emitted by the smart contract through the server api.
- `Collections` tab: create a NFT collection by interacting with the smart contract.
- `Tokens` tab: mint a NFT token by interacting with the smart contract.


**Enjoy it!**

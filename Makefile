run-hardhat:
	cd backend && nohup npx hardhat node & \
	sleep 5 && cd backend && npx hardhat run scripts/deploy.ts --network localnet

.PHONY: run-hardhat

stop-hardhat:
	cd backend && npx kill-port 8545

.PHONY: stop-hardhat

deploy-goerli:
	cd backend && npx hardhat run scripts/deploy.ts --network goerli

.PHONY: deploy-goerli

run-server:
	cd backend && npm start

.PHONY: run-server

run-client:
	cd frontend && npm start

.PHONY: run-client

npm-install:
	cd backend && npm install
	cd frontend && npm install

.PHONY: npm-install
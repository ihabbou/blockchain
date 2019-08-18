
# Blockchain Voting System

Blockchain project BlockChainReaction.

A voting system that uses blockchain technology.

## Overview
Blockchain implementation using the DPoS consensus algorithm.

The miner runs a blockchain server and collects the votes from the web user interface. Those votes are then added to the blocks and mined with the DPoS algorithm.

Every user logs in using his id (private key) to the web interface and chooses one from a set of candidates. Then a 'transaction' is applied with the selected candidate's data in the transaction.

## Instructions

0. Install all dependencies:

	For the blockchain:

	`npm install`

	For the front end:

	`cd front-end`

	`npm install`


1. First, Distribute tokens on voters: 

    `npm run distribute`

	It may take a while to obtain enough tokens to distribute and then synchronise the transactions.
	Make sure to shut it down manually if it does not shut down automatically.

2. Start the blockchain network

    `npm run blockchain`

3. Now to set up the voting machine
	
	Run the transaction creator:

    `npm run linker`

	Then start the [user interface](front-end/README.md)

	`cd front-end`

	`npm start`

4. Finally for the election results, make sure to terminate all other blockchain parts (blockchain network + transaction creator) first
	
	`npm run results`

* To display the entire blockchain:

	`npm run display`


## Ports
The project uses the port 3000 for the front end and the blockchain uses the ports 7999 to 8020.

Make sure that these ports are unoccupied.

* The data used by the blockchain node is stored in [tmp](tmp/) using the database system [leveldb](https://github.com/google/leveldb)
* The voter and miner data are in [blockchain/src/keys.json](blockchain/src/keys.json)
* The candidate data are in [front-end/src/candidates.js](front-end/src/candidates.js)

(P.S. Normally, these data are stored on a seperate government database which requires the set up of extra servers and interfaces.)


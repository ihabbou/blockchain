
# Blockchain Voting System

Blockchain project BlockChainReaction.

A voting system that uses blockchain technology.

## Overview
Blockchain implementation using the DPoS consensus algorithm.

The miner runs a blockchain server and collects the votes from the web user interface. Those votes are then added to the blocks and mined with the DPoS algorithm.

Every user logs in using his id (private key) to the web interface and chooses one from a set of candidates. Then a 'transaction' is applied with the selected candidate's data in the transaction.


## Instructions

All blockchain scripts should be run from the root directory, and the front end scripts should be run from the subdirectory [/front-end](/front-end).

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

2. Now to set up the voting machine

	Note: due to a problem in closing and reopening leveldb, voting using a changing node for different voters fails. So, the node 0 is used instead. Check [this branch](https://github.com/ihabbou/blockchain/tree/linked) for the non-working version that should be fixed soon.
	
	Run the transaction creator:

    `npm run linker`

	Then start the [user interface](front-end/README.md)

	`cd front-end`

	`npm start`

3. To vote, get a [private key](blockchain/src/keys.json) and use it to login


4. Finally for the election results, make sure to terminate all other blockchain parts (blockchain network + transaction creator) first
	
	`npm run results`

	You should wait until all nodes have received the transaction. the networking feature from [github.com/yjjnls/awesome-blockchain](https://github.com/yjjnls/awesome-blockchain) seems to take a while so make sure to see all the "node # load tx ..." for all nodes.

* To display the entire blockchain:

	`npm run display`


## Structure
The project uses the port 3000 for the front end and the blockchain uses the ports 7999 to 8020.

Make sure that these ports are unoccupied.

* The data used by the blockchain node is stored in [tmp](tmp/) using the database system [leveldb](https://github.com/google/leveldb)
* The voter and miner data are in [blockchain/src/keys.json](blockchain/src/keys.json)
* The candidate data are in [front-end/src/candidates.js](front-end/src/candidates.js)

(P.S. Normally, these data are stored on a seperate government database which requires the set up of extra servers and interfaces.)


var BlockChain = require('../blockchain.js');
var Transaction = require('../transaction.js').Transaction;
var Consensus = require("../dpos");


const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

let keys = require("../../front-end/src/candidates");


let resultText = "Election results: \n\n";
for (var i = 0; i < keys.candidates.length; ++i) {
	
    var keypair = ec.keyFromPrivate(keys.candidates[i].pk, 'hex');
        
    let blockchain = new BlockChain(Consensus, keypair, i);
	blockchain.start();
	let namae = keys.candidates[i].name;
	setTimeout(() => { 
		blockchain.get_balance().then((result) => {
			resultText += (`Candidate ${namae} got ${result} votes.\n`);
			blockchain.shutdown(); 
		}).catch((err) => {
			console.log(err);
		});;
		//	console.log(`node 0 balance: ${amount}`);
		//	delete blockchain;
	}, 3000);
}

setTimeout(() => { 
	console.log(resultText);
	process.exit();
}, 5000);

var BlockChain = require('../blockchain.js');
var Consensus = require("../dpos");


const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

let keys = require("../keys.json");

let blockchains = [];
for (var i = 1; i < keys.miners.length; ++i) {

    var keypair = ec.keyFromPrivate(keys.miners[i].private, 'hex');
    
    console.log(`node ${i} address: ${keypair.getPublic('hex')}`);
    
    let blockchain = new BlockChain(Consensus, keypair, i);
    blockchain.is_miner_ = true;
    blockchain.start();
    blockchains.push(blockchain);
}
let txs = [];
// keys = require("../../front-end/src/candidates");
let queue = keys.voters;
setInterval(() => {
    if (queue.length === 0) {
        console.log("waiting for other nodes... ");
        let broadcasted = true;
       /*  for (let i = 0; i < blockchains.length; i++) {
            const blockchain = blockchains[i];
            txs.forEach(tx => {
                if (!blockchain.tx_pool[tx]) broadcasted = false;
            });
        } */
    //    blockchains[1].sync();
        if (broadcasted) setTimeout(() => {
            console.log("done! shutting down...");
            process.exit();
        }, 15000);
    } else 
    blockchains[1].get_balance().then((balance) => {
        if (balance > 1) {
            let q = queue.pop();
            let address = q.public;
            blockchains[1].create_transaction(address, 1).then((tx) => {
                console.log("tx id =  ", tx.id);
                txs.push(tx.id);
            }).catch((err) => {
                console.log(err);
            });;
            console.log("Voter ", q.public, " received token");
        }
    });
}, 1000);

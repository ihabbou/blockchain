var BlockChain = require('../blockchain.js');
var Transaction = require('../transaction.js').Transaction;
var Consensus = require("../dpos");


const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


let blockchains = [];
for (var i = 0; i < 20; ++i) {

    var password = `I am tester ${i}!`;
	var hash = SHA256(password).toString();
	

	var keypair = ec.genKeyPair();
	// console.log("klef");

	// console.log("/=================================================/")
	// console.log(klef.getPrivate('hex'));
	// console.log(klef.getPublic('hex'));

    //var keypair = ed.MakeKeypair(hash);
    console.log(`node ${i} address: ${keypair.getPublic('hex')}`);

    let blockchain = new BlockChain(Consensus, keypair, i);
    blockchain.start();
    blockchains.push(blockchain);
}
setTimeout(() => {
    let address = blockchains[6].get_public_key();
    blockchains[0].create_transaction(address, 30);
}, 3000);

async function get_balance() {
    let amount = await blockchains[0].get_balance();
    console.log(`node 0 balance: ${amount}`);
    amount = await blockchains[6].get_balance();
    console.log(`node 6 balance: ${amount}`);
}

setInterval(get_balance, 10000);

/*
var tx = new Transaction("04efeee58f0a0bdaa7a6e0b6894e53769a81b5cd8e0472fa7e28fbeb70354a59aa455921889c29468cb1530c4a04b60ced108a1dd603e7ef24161b6792b6eb88b2",
	"04ed0da60e90ca6b081105db4f5f90f8e7c99793018a42031e7c0c80ff59d1595d3ec0da0a4b93bd968f1ac50405b2ba7f5562666c9b043e6cd6ddefba40259bca",
	5)
tx.signTransaction("11c36cdf22fb3d77981239265c7ab08672c247b193ab689eb267905530b0b9a3")
bc.addTransaction(tx);

console.log('bc', bc);




const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


/*
11c36cdf22fb3d77981239265c7ab08672c247b193ab689eb267905530b0b9a3
04efeee58f0a0bdaa7a6e0b6894e53769a81b5cd8e0472fa7e28fbeb70354a59aa455921889c29468cb1530c4a04b60ced108a1dd603e7ef24161b6792b6eb88b2

/=================================================/

2ccadfd399c642912b6256b6ac46c233887752cbc39a6993324d6c0dbf145fc8
04ed0da60e90ca6b081105db4f5f90f8e7c99793018a42031e7c0c80ff59d1595d3ec0da0a4b93bd968f1ac50405b2ba7f5562666c9b043e6cd6ddefba40259bca
*/
/*
var klef = ec.genKeyPair();
console.log("klef");

console.log("/=================================================/")
console.log(klef.getPrivate('hex'));
console.log(klef.getPublic('hex'));

/** */

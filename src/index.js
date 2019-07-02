var Blockchain = require('./blockchain.js').Blockchain;
var Transaction = require('./transaction.js').Transaction;


const bc = new Blockchain();
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

console.log(klef.getPrivate('hex'));
console.log("/=================================================/")
console.log(klef.getPublic('hex'));

/** */
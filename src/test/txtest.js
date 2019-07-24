const TxInput = require('../transaction').TxInput;
const TxOutput = require('../transaction').TxOutput;
const Transaction = require('../transaction').Transaction;

const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

var keypair = ec.keyFromPrivate('b3688d70c8e32bd89f4d3496a87472a7badc5e240e64fa3c332ae065abd5e042', 'hex');
// var keypair = ec.keyFromPrivate('724157c835f787d970c7647b1481ed195ef58a8e899e38c6f4aa4d337eb9cd73', 'hex');

// console.log(keypair.getPublic('hex')); // 0430a2496c10a0776387076ad4ed011cc8255da8f70f4a2dce3ca8d8758fee2180876decb5646af026c24b7d64d3e3cac58c16ad09e807a68c72440b4e9b9c2fcc
// console.log(keypair.getPublic('hex')); // 047b72a1b26b038c5a4b874584955b03e6f46efe86c6df106d3c6fd2d225d90052de636dfd60c1441393952633982643a6b7190c4d5072874f8b851954751308ef

let input = new  TxInput("047b72a1b26b038c5a4b874584955b03e6f46efe86c6df106d3c6fd2d225d90052de636dfd60c1441393952633982643a6b7190c4d5072874f8b851954751308ef", 
							-1, `Play Text Transaction`);
let output = [];
output.push(new TxOutput(50, keypair.getPublic('hex')));
output.push(new TxOutput(5, keypair.getPublic('hex')));
let tx = new Transaction([input], output);


console.log("tx = ");
console.log(tx);
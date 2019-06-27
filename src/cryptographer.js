const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


function calculateHash(data) {
	return SHA256(data.toString()).toString();
}


module.exports = {
	calculateHash
};
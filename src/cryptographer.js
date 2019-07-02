const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


function calculateHash(data) {
	return SHA256(data.toString()).toString();
}

function matchPrivateToPublicKey(privateKey, publicKey) {
	signingKey = ec.keyFromPrivate(privateKey, 'hex');
	return signingKey.getPublic('hex') === publicKey;
}

function sign(signingKey, hash) {
	signingKey = ec.keyFromPrivate(signingKey, 'hex');
	const sig = signingKey.sign(hash, 'base64');
	return sig.toDER('hex');
}

function verifySignature(hash, signature, fromAddress) {
	const publicKey = ec.keyFromPublic(fromAddress, 'hex');
	return publicKey.verify(hash, signature);
}

module.exports = {
	calculateHash,
	matchPrivateToPublicKey, 
	sign, 
	verifySignature 
};
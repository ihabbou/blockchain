const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


function calc_hash(data) {
	return SHA256(data).toString();
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

function verify_signature(data, signature, fromAddress) {
	const publicKey = ec.keyFromPublic(fromAddress, 'hex');
	return publicKey.verify(calc_hash(data), signature);
}

module.exports = {
	calc_hash,
	matchPrivateToPublicKey, 
	sign, 
	verify_signature 
};
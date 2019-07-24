var BlockChain = require('../blockchain.js');
var Transaction = require('../transaction.js').Transaction;
var Consensus = require("../dpos");


const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// var keypair = ec.genKeyPair();

// console.log(keypair.getPrivate('hex'));
// console.log("/=================================================/");
// console.log(keypair.getPublic('hex'));

let keys = ["b3688d70c8e32bd89f4d3496a87472a7badc5e240e64fa3c332ae065abd5e042",
        "c062f731402a4d55f9676b135c6aeabc736ab3dcadf8c27c70eec648de178e47",
        "889e2d192d9d4af714bfa66b1e9d3747dfa6fceefae4b02353c7a36bee1bacce",
        "f582165e5d735c1de1050e71f7c90cfa3af6726341dce2cb6c4903fd901f4205",
        "6a33bf1a93e5a4be16a4e5011378b0fb72c5c17baa205a9047ab34d917a199a5",
        "9324196d1cb81146fd1bdcfc91d3b0065ce19c72921dbaf27c76221cbf25c7a3",
        "724157c835f787d970c7647b1481ed195ef58a8e899e38c6f4aa4d337eb9cd73",
        "877b893317c04458271af35c64b0469f2f7408996e699f884a1f4c885824a6d1",
        "1d18aca72ba9851bc3c85181e32e3b7f27ff4da6509d3414f3ecc1fda44c24f6",
        "24191fada4090153929d501529f83adcdd3064bd37c4cc26074f03a0f4f1808d",
        "8df027405c29fba513a05bc56931ad62552114aaea3b582067c817930a2679df",
        "f1f89a14f6d15ab83c1bedd961fdedaa82150d4907bcac47a1b2d97d2331bca6",
        "1be27eb4911bd918212f31410a61de130c819b19f7e0aba6f400ed77fc16fbfd",
        "0a7a711221bddb4c2bd4b1791bb6766bd10da418c3bfb0223960b4f94229559a",
        "66fcdc237450f547a8cbc4d7562d92a7790d698b8a22059cc9c00b6ec06a28fb",
        "6b90a2ddec0279f9ad75717ef813e4ffaf4a66c8d5f62e8986a362e07df86cd9",
        "3c6165224361b3df2c03a5ba917da0c6c5f4c2d410e163f6dec491aa4f559690",
        "f7cacbf8260012aa1e92d227882c5e8cba69853c80fb5f874ef614fb803cddd4",
        "9afad5ab8153aa65795337508a769ae6f5d8eeb6458f54467c273dd547f3c6d2",
        "da16a00addf7a3ae5ba4b1e3f81f1930aeb898524b2e8767fac338977fee271b"];

let blockchains = [];
for (var i = 0; i < 20; ++i) {

    var password = `I am tester ${i}!`;
	var hash = SHA256(password).toString();
	

	//var keypair = ec.genKeyPair();
	var keypair = ec.keyFromPrivate(keys[i], 'hex');
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
    blockchains[0].get_balance().then((ball) => {
        console.log("ACCCC steuer = ", ball);//blockchains[0].get_public_key()
    });
    blockchains[0].create_transaction(address, 1);
}, 3000);

async function get_balance() {
    let amount = await blockchains[0].get_balance();
    console.log(`node 0 balance: ${amount}`);
    amount = await blockchains[6].get_balance();
    // console.log(`node 6 balance: ${amount}`);
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

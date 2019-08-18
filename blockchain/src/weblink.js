'use strict';

var net = require("net");
var EventEmitter = require('events').EventEmitter;

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

var BlockChain = require('./blockchain.js');
var Consensus = require("./dpos");

var PORT = 8000;
var blockchains = [];

/**
 * This script creats the blockchain and receives the transaction data
 * from the websockets
 */
class WebLink extends EventEmitter {
    constructor(id) {
        super();
        
        let self = this;
        this.server_ = net.createServer((socket) => {
            socket.setEncoding('utf8');
            socket.on('data', (data) => { self.on_data(data); });
            socket.on('end', () => { console.log("---END SIGNAL---"); });
        });
        this.server_.listen(PORT + id);
        console.log("Weblink started.");
        console.log("You may use this machine to vote.");

        let keys = require("./keys.json");

        for (var i = 0; i < keys.miners.length; ++i) {

            var keypair = ec.keyFromPrivate(keys.miners[i].private, 'hex');
            
            console.log(`node ${i} address: ${keypair.getPublic('hex')}`);
            
            let blockchain = new BlockChain(Consensus, keypair, i);
            blockchain.is_miner_ = true;
            blockchain.start();
            blockchains.push(blockchain);
            setInterval(() => {
        // blockchain.sync();
            }, 3000);
        }
    }
    
    on_data(data) {
        if (!data.startsWith("{")) {
            var reg = /Referer\:\shttps?\:.*/;
            var pure = data.match(reg)[0];
            pure = decodeURIComponent(pure.substring(pure.indexOf("?tx=")+4));
            data = JSON.parse(pure);
            console.log(`Node receied transaction: vote to ${data.candidate.id}`);
            
        }
        try {
            console.log("++++++++++++++++++");
            var keypair = ec.keyFromPrivate(data.key, 'hex');
            
            setTimeout(() => {
                blockchains[0].create_transaction(data.candidate.id, 1);
            }, 4000);
            
        } catch (err) {
            console.log("=========================");
            console.log(`voter\t failed to vote: `);
            console.log(err);
            console.log(err.message);
            console.log(data);
            console.log("=========================");
        }

    }
}

module.exports = WebLink;

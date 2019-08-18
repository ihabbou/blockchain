'use strict';

var net = require("net");
var EventEmitter = require('events').EventEmitter;

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

var BlockChain = require('./blockchain.js');
var Consensus = require("./dpos");

var PORT = 8000;

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
    }
    
    on_data(data) {
        console.log('weblink data from socket '+" to " +this.id_ +" ===="+ data);
        if (!data.startsWith("{")) {
            var reg = /Referer\:\shttps?\:.*/;
            var pure = data.match(reg)[0];
            pure = decodeURIComponent(pure.substring(pure.indexOf("?tx=")+4));
            data = JSON.parse(pure);
        //    data = JSON.stringify(data);
            console.log(`Node ${this.id_} receied transaction: `);
            console.log(data);
            console.log(`Node ${this.id_} broadcasting`);
        }
        try {
            console.log("++++++++++++++++++");
            console.log("candidate == ", data.candidate);
            var keypair = ec.keyFromPrivate(data.key, 'hex');
            
            let blockchain = new BlockChain(Consensus, keypair, 0);
            blockchain.is_miner_ = true;
            blockchain.start();

             // 悪い var balance =  await blockchain.get_balance();
            // 悪い if (balance !== 1) return; // more than one or less than one means something is wrong

            setTimeout(() => {
                /* blockchain.get_balance().then((balance) => {
                    if (balance > 1)
                        blockchain.create_transaction(data.candidate.id, 1); 
                }).catch((err) => {
                    console.log(err);
                }); */
                /* var balance =  await blockchain.get_balance();
                if (balance === 1)
                    blockchain.create_transaction(data.candidate.id, 1);  */
                blockchain.create_transaction(data.candidate.id, 1);
                blockchain.shutdown(); }, 17000);
            
        } catch (err) {
            console.log("=========================");
            console.log(`voter\t failed to vote: `);
            console.log(err);
            console.log(err.message);
            console.log(data);
            console.log("=========================");
            setTimeout(() => { blockchain.shutdown(); }, 3000);
        //    throw new Error();
        }

    }
}

module.exports = WebLink;

//new WebLink(1);
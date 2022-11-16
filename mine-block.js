import {
  getBlockchain,
  getTransactions,
  writeBlockchain,
  writeTransactions
} from './blockchain-helpers.js';

import sha256 from 'crypto-js/sha256.js';

const bc = getBlockchain();
const lastBlock = bc[bc.length - 1];
const previousHash = lastBlock.hash;
const transactions = getTransactions();
let nonce = 0;
const calcHash = () => sha256(nonce + previousHash + JSON.stringify(transactions)).toString();
let hash = calcHash();
while (!hash.startsWith("00")) {
  nonce++;
  hash = calcHash();
}

const block = {
  hash,
  previousHash,
  nonce,
  transactions
};

bc.push(block);
writeBlockchain(bc);
writeTransactions([]);
import {
  getAddressBalance,
  getTransactions,
  getItemPrice,
  writeTransactions
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const buyerPrivateKey = process.argv[2];
const itemBought = process.argv[3];

const keyPair = ec.keyFromPrivate(buyerPrivateKey);
const buyerAddress = keyPair.getPublic('hex');
const sellerAddress = null;
const price = getItemPrice(itemBought);
if (price > getAddressBalance(buyerAddress)) {
  console.log('User cannot afford the item');
  process.exit();
}

const msgToSign = `${buyerAddress}${price}${itemBought}`;
const signature = keyPair.sign(msgToSign).toDER('hex');

const tx = {
  buyerAddress,
  sellerAddress,
  price,
  itemBought,
  signature
};

const transactions = getTransactions();
transactions.push(tx);
writeTransactions(transactions);
console.log('Buy TX sent!');
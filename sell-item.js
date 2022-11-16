import {
  getAddressItems,
  getItemPrice,
  getTransactions,
  writeTransactions
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const sellerPrivateKey = process.argv[2];
const itemSold = process.argv[3];

const keyPair = ec.keyFromPrivate(sellerPrivateKey);
const sellerAddress = keyPair.getPublic('hex');
const buyerAddress = null;
const price = getItemPrice(itemSold) - 5;
const sellerItems = getAddressItems(sellerAddress);
if (sellerItems[itemSold] === 0) {
  console.log('User does not have the item');
  process.exit();
}

const msgToSign = `${sellerAddress}${price}${itemSold}`;
const signature = keyPair.sign(msgToSign).toDER('hex');

const tx = {
  buyerAddress,
  sellerAddress,
  price,
  itemSold,
  signature
};

const transactions = getTransactions();
transactions.push(tx);
writeTransactions(transactions);
console.log('Sell TX sent!');

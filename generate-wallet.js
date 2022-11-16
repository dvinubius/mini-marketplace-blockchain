import {
  getTransactions,
  writeTransactions,
  getWallets,
  writeWallets
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const newWalletName = process.argv[2];
const wallets = getWallets();
const pair = ec.genKeyPair();
wallets[newWalletName] = {
  "publicKey": pair.getPublic('hex'),
  "privateKey": pair.getPrivate('hex')
};
writeWallets(wallets);

const txs = getTransactions();
txs.push({
  buyerAddress: null,
  sellerAddress: wallets[newWalletName].publicKey,
  price: 40
});
writeTransactions(txs);
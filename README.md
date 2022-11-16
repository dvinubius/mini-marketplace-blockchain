# Mini Marketplace Blockchain

> Based on freecodecamp's [web3 curriculum](https://web3.freecodecamp.org/web3)


Draft for a PoW Blockchain client. The blockchain is designed specifically for a video-game-marketplace.

- *game* items have hardcoded prices
- *game* may gift items to users
- basic selling and buying btw. user and *game*

## Network

Not a distributed system - no networking logic, no consensus algorithm.
For a basic implementation of a p2p network, see [this repo](https://github.com/dvinubius/basic-p2p-network).

## Persistance
- blockchain: `blockchain.json`
- transaction pool: `transactions.json`

## Dev
For convenience at dev time we keep a mapping of known usernames to their public/private keypair in `wallets.json`
This can be populated with `node generate-wallet.js <user_name>`

- **reset** with `node init-blockchain.js`
- **mine** with `node mine-block.js` (1 block per command)
- **see balances and owned items** for a known user with `node get-user-info.js`


- **gift random items** to known users with `node gift-itmes.js`


- submit a **buy** transaction: `node buy-item.js <buyer_private_key> <item_name>`
- submit a **sell** transaction: `node buy-item.js <seller_private_key> <item_name>`

## Knitty-Gritty
- no size restrictions on block / tx data
- for signing TXs we use JS `elliptic` with EC.ec('p192') - Elliptic Curve Diffie Hellman (ECDH) standard p192.
- signatures are DET encoded in hex format

## Outlook (TODO)
- support transactions (sales) from user to user
- networking capabilities
- consensus

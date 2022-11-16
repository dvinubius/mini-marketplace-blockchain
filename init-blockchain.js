import { writeBlockchain, writeTransactions } from './blockchain-helpers.js';

writeBlockchain([{
  hash: "0",
  previousHash: null
}]);

writeTransactions([])

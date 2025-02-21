import { Keypair } from '@solana/web3.js';

let kp = Keypair.generate();
console.log(`You've generated a new solana wallet: ${kp.publicKey.toBase58()}`);

console.log(`Private key:`);
console.log(`[${kp.secretKey}]`);

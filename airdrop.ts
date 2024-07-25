import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import wallet from './dev-wallet.json';

const kp = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log(`Public Key:`, kp.publicKey.toBase58());

const connection = new Connection(clusterApiUrl('devnet'));

(async () => {
  try {
    const txhash = await connection.requestAirdrop(kp.publicKey, 2 * LAMPORTS_PER_SOL);
    console.log(
      `success! check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`,
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

// https://explorer.solana.com/tx/rXSWHNEnuRNthbnfzKHfGMTBuNcDUqcPHeP3o7D3hfqa4i3b41ifKZw2n9QRgejF7dgZNnNVruWjANTv7vKfwZ3?cluster=devnet

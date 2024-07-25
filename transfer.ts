import {
  Transaction,
  SystemProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';
import wallet from './dev-wallet.json';

// Import our dev wallet keypair from the wallet file
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Define our WBA public key
const to = new PublicKey('7z7Q3UH4cMxSNDTATsQcC34rr4MVA9ydqpbeqnU4q7ba');

//Create a Solana devnet connection
const connection = new Connection(clusterApiUrl('devnet'));

(async () => {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL / 10,
      }),
    );
    transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
    transaction.feePayer = from.publicKey;
    // Sign transaction, broadcast, and confirm
    const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
    console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

// https://explorer.solana.com/tx/3Y9x65Yf4a8htyPAvAzPVwvF4gXevABnKGEVntM1eqp1TKn7vs2zwAKybPdUcTzTCuvSDjRJeWvZ5B9ViZ7QfFii?cluster=devnet

// Empty the wallet
// (async () => {
//   try {
//     // Get balance of dev wallet
//     const balance = await connection.getBalance(from.publicKey);
//     // Create a test transaction to calculate fees
//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: from.publicKey,
//         toPubkey: to,
//         lamports: balance,
//       }),
//     );
//     transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
//     transaction.feePayer = from.publicKey;
//     // Calculate exact fee rate to transfer entire SOL amount out of account minus fees
//     const fee =
//       (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;
//     // Remove our transfer instruction to replace it
//     transaction.instructions.pop();
//     // Now add the instruction back with correct amount of lamports
//     transaction.add(
//       SystemProgram.transfer({
//         fromPubkey: from.publicKey,
//         toPubkey: to,
//         lamports: balance - fee,
//       }),
//     );
//     // Sign transaction, broadcast, and confirm
//     const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
//     console.log(`Success! Check out your TX here:
//         https://explorer.solana.com/tx/${signature}?cluster=devnet`);
//   } catch (e) {
//     console.error(`Oops, something went wrong: ${e}`);
//   }
// })();

// https://explorer.solana.com/tx/pzdMyKXdw1ve9L6NMWZKp3raQ6k6c5Apar2P3iKUh183n6K9uN9VGuz2Lw1D922NWHS6KocEoeESkNZYWa48XUB?cluster=devnet

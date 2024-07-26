import { clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Program, Wallet, AnchorProvider, Idl } from '@coral-xyz/anchor';
import { IDL, WbaPrereq } from './programs/wba_prereq';
import { kp as keypair } from './wba-wallet';

// Create a devnet connection
const connection = new Connection(clusterApiUrl('devnet'));

// Github account
const github = Buffer.from('cogoo', 'utf8');

// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: 'confirmed',
});

// Create our program
const program: Program<WbaPrereq> = new Program(IDL, provider);

// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from('prereq'), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId,
);

// Execute our enrollment transaction
(async () => {
  try {
    const txhash = await program.methods
      .update(github)
      .accounts({
        signer: keypair.publicKey,
        prereq: enrollment_key,
        system_program: new PublicKey('11111111111111111111111111111111'),
      })
      .signers([keypair])
      .rpc();
    console.log(`Success! Check out your TX here:
          https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

// https://explorer.solana.com/tx/2HiQ1dzCvjttXhNNGPr9ZWLL28xWr9HcEV1ULTiEfsX9BLZLNgNBniEt3qGEcpS1amYRQRyzggKhkfMGVWpbnW6H?cluster=devnet

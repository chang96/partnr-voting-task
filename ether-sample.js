const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("JRPC_PROVIDER_URL");

const privateKey = "PRIVATE_KEY";
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function registerCandidate(candidateName) {
  const tx = await contract.registerCandidate(candidateName);
  console.log("transaction sent: ", tx.hash);
  await tx.wait();
  console.log("candidate registered.");
}

async function voteForCandidate(candidateId) {
  const tx = await contract.vote(candidateId);
  console.log("voting transaction sent: ", tx.hash);
  await tx.wait();
  console.log("vote registered.");
}

async function closeVoting() {
  const tx = await contract.closeVoting();
  console.log("voting closed: ", tx.hash);
  await tx.wait();
  console.log("voting has been closed.");
}

async function run() {
  await registerCandidate("candidate1");
  await registerCandidate("candidate2");

  await voteForCandidate(1);
  await voteForCandidate(2);
  
  await closeVoting();
}

run().catch(console.error);

import { ethers } from "ethers";

const provider = new ethers.InfuraProvider();
console.log ("Current Block Number: ", await provider.getBlockNumber());
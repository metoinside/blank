import { ethers } from "ethers"

const provider = new ethers.InfuraProvider("goerli", "11ba91059a854be0889901bf564477c3");

export default async function Home() {
  return <h1 className="text-5xl font-bold">Current Blocknumber: {await provider.getBlockNumber()}</h1>
}

import { ethers } from "ethers"
import Navbar from "./components/navbar";
import Cards from "./components/cards";
import Footer from "./components/footer";
import Steps from "./components/steps";
import Table from "./components/table"
import Divider from "./components/divider";

const provider = new ethers.InfuraProvider("goerli", "11ba91059a854be0889901bf564477c3");

export default async function Home() {
  return (
  <div>
    <Navbar/>
    
    <div className="container mx-auto">
    <h1 className="text-5xl font-bold text-center p-20">Current Blocknumber: {await provider.getBlockNumber()}</h1>
    <Steps />
    <div className="columns-3 flex justify-between">
      <Cards/>
      <Cards/>
      <Cards/>
    </div>
    <Divider />
    <Table/>
    <Divider />
    </div>
    <Footer />
    
    
  </div>)
}

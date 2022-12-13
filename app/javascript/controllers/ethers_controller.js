import { checkProperties } from "@ethersproject/properties";
import { Controller } from "@hotwired/stimulus"
import { ethers, ContractFactory } from "ethers"
import fs from 'fs';

import AlystCampaign from '../utils/AlystCampaign.json' assert {type: 'json'};


const { ethereum } = window;

// Get the provider and signer from the browser window
let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer = provider.getSigner();
let abi = null;
// const setupEventListener = async () => {
//   try {
//     if (ethereum) {
//       const provider = new ethers.providers.Web3Provider(ethereum);
//       const signer = provider.getSigner();
//       const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

//       connectedContract.on('NewEpicNFTMinted', (from, tokenId) => {
//         console.log(from, tokenId.toNumber());

//         alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);

//         updateTotalNFTsMintedSoFar();
//       });

//     } else {
//       console.log('Ethereum object not found');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// Connects to data-controller="ethers"
export default class extends Controller {
  static targets = [ "etherState", "targetAmount", "periodOfTime", "name" ]

  static values = {
    accounts: String,
    balance: String,
    bytecode: String,
    wallet: String,
    provider: String,
    mnemonic: String,
    factory: Object,
    contract: Object
  }

  connect() {
    
  }

  async connectWallet(event) {
    event.preventDefault()

    try {
      if (!ethereum) {
        alert('Get metamask!');
        return;
      }
      this.accountsValue = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log(this.accountsValue, 'account')
    } catch (error) {
      console.log(error);
    }
  }

  async createCampaign(event) {
    event.preventDefault();

    abi = JSON.parse(JSON.stringify(AlystCampaign.abi));
    this.bytecodeValue = AlystCampaign.bytecode;
    console.log(ethereum, 'ethereum')
    // this.mnemonicValue = "music fruit mistake melt rice rigid keep stomach autumn midnight museum wrist" // seed phrase for your Metamask account
    this.providerValue = new ethers.providers.Web3Provider(ethereum);
    console.log(this.providerValue, "this.providerValue")
    this.factoryValue = new ContractFactory(abi, this.bytecodeValue, this.providerValue.getSigner());
    this.contractValue = this.factoryValue.deploy(this.nameTarget, this.targetAmountTarget, this.periodOfTimeTarget);
    
    console.log(this.nameTarget.value, this.targetAmountTarget.value, this.periodOfTimeTarget.value)
    console.log("CREATING CAMPAIGN@@")
  }

  async fundCampaign(event) {

  }

  async withdrawFunds(event) {

  }
}

import { checkProperties } from "@ethersproject/properties";
import { Controller } from "@hotwired/stimulus"
import { ethers, ContractFactory } from "ethers"
import Rails from "@rails/ujs";
Rails.start()
import AlystCampaign from '../utils/AlystCampaign.json' assert {type: 'json'};


const { ethereum } = window;

// Get the provider and signer from the browser window
let provider = new ethers.providers.Web3Provider(ethereum);
let signer = provider.getSigner();
let abi = JSON.parse(JSON.stringify(AlystCampaign.abi));
let bytecode = AlystCampaign.bytecode;
let factory = null;
let contract = null;
let deployed = null;

// Connects to data-controller="ethers"
export default class extends Controller {
  static targets = [ "etherState", "targetAmount", "periodOfTime", "name", "contractAddress" ]

  static values = {
    accounts: String,
    balance: String,
    wallet: String,
    contract: String

  }

  async connectWallet(event) {
    event.preventDefault()

    try {
      if (!ethereum) {
        alert('Get metamask!');
        return;
      }
      this.accountsValue = await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log(error);
    }
  }

  async createCampaign(event) {
    event.preventDefault();
    factory = new ContractFactory(abi, bytecode, provider.getSigner());
    contract = await factory.deploy(this.nameTarget.value, this.targetAmountTarget.value, new Date(this.periodOfTimeTarget.value).getTime())
    deployed = await contract.deployed()
    
    if (deployed) {
      Rails.ajax({
        type: "post",
        url: "/catalysts",
        data: new URLSearchParams({ name: this.nameTarget.value, target_amount: this.targetAmountTarget.value, period_of_time: this.periodOfTimeTarget.value, contract_address: contract?.address }),
        success: function(response) {
          console.log(response, 'SUCCESS resoonse')
          // Add a redirect to the campaign show page
        },
        error: function(response) {
          console.log(response, 'ERROR resoonse')
        }

      })
    } else {
      // Need to return an error to front end
      console.log("FAILED")
    }

  }

  async pledgeToCampaign(event) {
    provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(this.contractAddressTarget.innerHTML, abi, signer);

    let txn = await contract.pledgeToCampaign(1, {
      value: ethers.utils.parseUnits("1", "ether"),
      gasLimit: 50000
    });
    await txn.wait();

    console.log("Pledged to campaign on this trnasaction:", txn.hash)
  }

  async withdrawFunds(event) {
    provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(this.contractAddressTarget.innerHTML, abi, signer);

    let txn = await contract.withdraw(1, {
      value: ethers.utils.parseUnits("1", "ether"),
      gasLimit: 50000
    });
    await txn.wait();

    console.log("Pledged to campaign on this trnasaction:", txn.hash)
  }
}



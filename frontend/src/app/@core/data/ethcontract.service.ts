import { Injectable } from '@angular/core';
const Web3 = require("web3");
declare let require: any;
declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class EthcontractService {
    private web3Provider: null;
    myAccount: any;
    private contracts = [{
      object: null,
      abi:[ { "constant": false, "inputs": [ { "name": "_index", "type": "uint256" }, { "name": "_senderLongitude", "type": "string" }, { "name": "_senderLatitude", "type": "string" }, { "name": "_recipientLongitude", "type": "string" }, { "name": "_recipientLatitude", "type": "string" } ], "name": "setCoordinates", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "parcelStorage", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ServiceProviderContract", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "removeParcel", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_index", "type": "uint256" }, { "name": "_recipientFirstName", "type": "string" }, { "name": "_recipientLastName", "type": "string" }, { "name": "_recipientStreet", "type": "string" }, { "name": "_recipientStreetNr", "type": "string" }, { "name": "_recipientPostcode", "type": "string" }, { "name": "_recipientTown", "type": "string" }, { "name": "_recipientCountry", "type": "string" } ], "name": "setReceiver", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_id", "type": "uint256" }, { "name": "_date", "type": "string" }, { "name": "_senderLongitude", "type": "string" }, { "name": "_senderLatitude", "type": "string" }, { "name": "_recipientLongitude", "type": "string" }, { "name": "_recipientLatitude", "type": "string" } ], "name": "addParcel", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_index", "type": "uint256" }, { "name": "_length", "type": "uint256" }, { "name": "_height", "type": "uint256" }, { "name": "_width", "type": "uint256" }, { "name": "_dangerous", "type": "bool" }, { "name": "_fragile", "type": "bool" }, { "name": "_tempSensitive", "type": "bool" } ], "name": "setParcelProperties", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "getParcelStorage", "outputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "address" }, { "name": "", "type": "string" }, { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_index", "type": "uint256" } ], "name": "triggerDelivered", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_index", "type": "uint256" }, { "name": "_senderFirstName", "type": "string" }, { "name": "_senderLastName", "type": "string" }, { "name": "_senderStreet", "type": "string" }, { "name": "_senderStreetNr", "type": "string" }, { "name": "_senderPostcode", "type": "string" }, { "name": "_senderTown", "type": "string" }, { "name": "_senderCountry", "type": "string" } ], "name": "setSender", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "getParcelLocation", "outputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "address" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "addr", "type": "address" } ], "name": "changeLastMileStart", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_index", "type": "uint256" }, { "name": "_ownerAddress", "type": "address" } ], "name": "setOwnerAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "arrayIndex", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ],
      address: '###CONTRACT-ADRESS###', //0x8089f808f07114fcb8e8b27e9276c95c38e6bcf2  0x6b3fe82d4ba668d82dfd5be32433ad1d7a0d97c4
    }];
    contractAdmin: any;
    constructor() {
        if (typeof window.web3 !== 'undefined') {
            this.web3Provider = window.web3.currentProvider;
            console.log('MetaMask is installed');
        } else {
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545'); //http://35.159.31.35:8545
        }
        window.web3 = new Web3(this.web3Provider);
        this.getAccountInfo().then((res)=> {
        this.myAccount = res;}, (rej)=>{console.log(rej)});
        this.contractAdmin = window.web3.eth.contract(this.contracts[0].abi).at(this.contracts[0].address);

        /*this.getAccountInfo().then((res)=> {
        this.myAccount = res;
        console.log(res.addr);
        this.contractOne.methods.provider().call({from: this.myAccount.addr}, (error, result) => {
            console.log(result);
        });
      }, (rej)=>{console.log(rej)});*/
      console.log(this.web3Provider);
      }
    getAccountInfo() {
        return new Promise((resolve, reject) => {

            window.web3.eth.getCoinbase(function (err, account) {

                if (err == true) {
                   console.log("Error: "+ err)
                   console.log("Account: "+ account)
                }
                else {
                  console.log(account);
                    window.web3.eth.getBalance(account, function (err, balance) {
                        console.log(err);
                        console.log(balance);
                        if (err === null) {
                            return resolve({ addr: account, balance: balance /1e18 });
                        } else {
                            return reject("error!");
                        }
                    });
                }
            });
        });
    }
    getParcelCount() {
        return new Promise((resolve, reject) => {

          this.contractAdmin.arrayIndex({from: this.myAccount.addr}, (error, result) => {
            console.log("result"+ result)
            if ( error == true) {
               console.log("Error: "+ error)
               console.log("Account: "+ result)
            }
            else {
                if (error === null) {

                        return resolve(result);
                    } else {
                        return reject("error!");
                    }

            }
          });
        });
    }
    getParcels(count: any , res: any ) {
        console.log("Test"+res);
          let array = [];
          for(let i= 0; i < count; i++){

            this.contractAdmin.getParcelStorage(i, (error, result) => {
              //console.log(result)
              if (error == true) {
                 console.log("Error: "+ error)
                 console.log("Account: "+ res)
              }
              else {
                  if (error === null) {
                          array.push({id: result[0], addr: result[1], arrivalTime: result[2], accepted: result[3]});
                          res(array);

                      }
              }
            });
          }

    }
    newParcel(parcel: any) {
        return new Promise((resolve, reject) => {
          //onsole.log(this.myAccount.addr);
          let lat =String(parcel.destination.x);
          let lnd = String(parcel.destination.y);
          console.log(lat +"    "+ lnd);
          this.contractAdmin.addParcel(parcel.id, String(parcel.arrivalTime),lat, lnd ,lat,lnd,{from: this.myAccount.addr, password: "user"},  (error, result) => {

            //console.log("ff"+parcel.destination.x *1000000);
            if (error == true) {
               console.log("ErrorN: "+ error)
               console.log("AccountN: "+ result)
            }
            else {

                if (error !== true) {
                        return resolve(result);
                    } else {
                        return reject("error!");
                    }

            }
          });



        });
    }
}

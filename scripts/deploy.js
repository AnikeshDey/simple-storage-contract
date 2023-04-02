//IMPORTS
const { ethers, network, run } = require("hardhat"); //Get ethers from hardhat package

//ASYNC MAIN FUNCTION
async function main(){
  //hardhat directly knows about the contract abi and binary so just mention the name of contract 
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying SimpleStorage Contract....");

  //Deploy Simple Storage
  const simpleStorage = await SimpleStorageFactory.deploy();

  //Wait for one block transaction
  //await simpleStorage.deployTransaction.wait(1);

  //Wait to be deployed
  await simpleStorage.deployed(); //both approach will work here

  //Get contract address
  console.log(`Contract Address: ${simpleStorage.address}`);

  //Verify the contract if the network chain Id matches with rinkeby
  if(network.config.chainId == 4){
    //first wait for few blocks to write
    await simpleStorage.deployTransaction.wait(6);
    //then verify
    await verify(simpleStorage.address, []);
  }

  //READ from contract
  let favNumber = await simpleStorage.retrieve();

  console.log(`Current Fav Number: ${favNumber.toString()}`);

  //SET new Fav Number
  let response = await simpleStorage.store("7");

  //Wait for one block transaction
  await response.wait(1);

  //READ from contract
  favNumber = await simpleStorage.retrieve();

  console.log(`New Fav Number: ${favNumber.toString()}`);
}

async function verify(contractAddress, args){
  try{
    console.log("Verifing contract.....");
    //run lets you run specific tasks in hardhat
    await run("verify:verify", {
      address:contractAddress, //address of your contract
      constructorArguments:args //additional arguments
    })
  } catch(err){
    //check if the contract is already verified
    if(err.message.toLowerCase().includes("already verified")){
      console.log("Already Varified");
    } else{
      console.log(err);
      process.exit(1);
    }
  }
}

//CALL MAIN FUNCTION

main().then(res => process.exit(0))
.catch(err => {
  console.log(err);
  process.exit(1);
});
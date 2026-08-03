import hre from "hardhat";

async function main() {

  const { ethers } = await hre.network.connect();


  // Get accounts
  const [owner, approver] = await ethers.getSigners();


  // Connect contract with owner account
  const lor = await ethers.getContractAt(
    "LoR",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    owner
  );


  console.log("Owner:", owner.address);
  console.log("Approver:", approver.address);


  // 1. Add Student
  const addTx = await lor.addStudent(
    "Rahul Kumar",
    "B.Tech CSE",
    "rahul@gmail.com"
  );

  await addTx.wait();

  console.log("\nStudent Added");


  console.log(
    await lor.getStudent(1)
  );


  // 2. Request Recommendation
  const requestTx =
    await lor.requestRecommendation(1);

  await requestTx.wait();


  console.log("\nRecommendation Requested");


  console.log(
    await lor.getStudent(1)
  );


  // 3. Authorize Approver (Owner action)
  const authTx =
    await lor.authorizeApprover(
      approver.address
    );

  await authTx.wait();


  console.log("\nApprover Authorized");


  // 4. Approve Recommendation (Approver action)

  const lorApprover =
    lor.connect(approver);


 const approveTx =
    await (lorApprover as any).approveRecommendation(1);

  await approveTx.wait();


  console.log("\nRecommendation Approved");


  // 5. Final Status

  console.log("\nFinal Student Status:");

  console.log(
    await lor.getStudent(1)
  );

}


main()
.catch((error)=>{

  console.error(error);

  process.exitCode = 1;

});
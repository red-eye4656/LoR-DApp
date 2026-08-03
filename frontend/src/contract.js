import { ethers } from "ethers";
import LoR from "./abi/LoR.json";

const CONTRACT_ADDRESS =
  "0x38388687A1C94dA03c95B50b0e41837669b0fc5b";

export async function getContract() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    LoR.abi,
    signer
  );
}
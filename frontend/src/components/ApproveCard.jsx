import { useState } from "react";
import { uploadToIPFS } from "../utils/ipfs";
import { getContract } from "../contract";


export default function ApproveCard() {

    const [studentId,setStudentId] = useState("");
    const [file,setFile] = useState(null);
    const [loading,setLoading] = useState(false);


    async function approve(){

        try{

            if(!file){
                alert("Please upload LoR file");
                return;
            }


            setLoading(true);


            // Upload file to IPFS
            const cid = await uploadToIPFS(file);


            console.log(
                "IPFS CID:",
                cid
            );


            // Blockchain transaction
            const contract = await getContract();


            const tx =
            await contract.approveRecommendation(
                studentId,
                cid
            );


            await tx.wait();


            alert(
              "LoR Approved Successfully"
            );


        }
        catch(error){

            console.log(error);
            alert(error.message);

        }


        setLoading(false);

    }



    return(

        <div className="approve-card">

            <h2>
              Faculty Approval
            </h2>


            <input
              type="number"
              placeholder="Student ID"
              value={studentId}
              onChange={
                e=>setStudentId(e.target.value)
              }
            />


            <input
              type="file"
              accept=".pdf,.txt"
              onChange={
                e=>setFile(e.target.files[0])
              }
            />


            <button
              onClick={approve}
              disabled={loading}
            >

            {
              loading
              ?
              "Uploading..."
              :
              "Approve & Upload LoR"
            }

            </button>


        </div>

    );
}
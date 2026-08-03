// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LoR is Ownable {

    constructor() Ownable(msg.sender) {}

    struct Student{

        string name;
        string course;
        string email;

        bool recommendationRequested;
        bool recommendationApproved;

        // IPFS CID
        string ipfsHash;
    }


    uint public studentCount;


    mapping(uint => Student) public students;


    mapping(address => bool) public approvers;


    modifier onlyApprover(){
        require(approvers[msg.sender], "Not Authorized");
        _;
    }



    function authorizeApprover(address _user)
        public
        onlyOwner
    {
        approvers[_user]=true;
    }



    function deauthorizeApprover(address _user)
        public
        onlyOwner
    {
        approvers[_user]=false;
    }




    function addStudent(
        string memory _name,
        string memory _course,
        string memory _email
    )
    public
    {

        studentCount++;


        students[studentCount]=Student(
            _name,
            _course,
            _email,
            false,
            false,
            ""
        );

    }




    function requestRecommendation(uint _id)
        public
    {

        require(
            _id <= studentCount && _id > 0,
            "Invalid ID"
        );


        students[_id].recommendationRequested=true;

    }





    function approveRecommendation(
        uint _id,
        string memory _hash
    )
        public
        onlyApprover
    {

        require(
            students[_id].recommendationRequested,
            "Recommendation not requested"
        );


        students[_id].recommendationApproved=true;


        // Store IPFS CID
        students[_id].ipfsHash=_hash;

    }





    function getStudent(uint _id)
        public
        view
        returns(
            string memory,
            string memory,
            string memory,
            bool,
            bool,
            string memory
        )
    {

        Student memory s=students[_id];


        return(
            s.name,
            s.course,
            s.email,
            s.recommendationRequested,
            s.recommendationApproved,
            s.ipfsHash
        );

    }

}
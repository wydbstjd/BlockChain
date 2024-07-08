//SPDX-License-Identifier:GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Rsp {
    address owner;
    address A;
    address B;
    uint result;

    mapping(address => uint) AddToRsp;
    mapping(address => uint) BalanceOf;
    constructor() {
        owner = msg.sender;
    }
    function setA() public payable {
        A = tx.origin;
        AddToRsp[A] = uint8(uint256(keccak256(abi.encodePacked(block.timestamp)))%3);
        BalanceOf[A] = (A).balance;
        require(msg.value == 1000);
        BalanceOf[A] -= 1000;
    }
    function setB(uint8 user) public payable{
        require(user >= 0 && user <= 2);
        B = tx.origin;
        AddToRsp[B] = user;
        BalanceOf[B] = (B).balance;
        require(msg.value == 1000);
        BalanceOf[B] -= 1000;
    }
    function play() public {
        if (AddToRsp[A] == AddToRsp[B]) {
            result = 0; //비겼을 때
        }
        else if ((AddToRsp[A] == 0 && AddToRsp[B] == 1) || (AddToRsp[A] == 1 && AddToRsp[B] == 2) || (AddToRsp[A] == 2 && AddToRsp[B] == 0)) {
            result = 1; // A가 이겼을 때
        }
        else {
            result = 2; // B가 이겼을 때
        }
    }
    function getMatchResult() public view returns(string memory){
        if (result == 0) {
            return "tie";
        }
        else if (result == 1) {
            return "A wins";
        }
        else {
            return "B wins";
        }
    }
    function distributeBetAmount() public payable{
        if (result == 1) {
            payable(owner).transfer(2000);
            BalanceOf[A] += 2000;
        }
        else if (result == 2) {
            payable(owner).transfer(2000);
            BalanceOf[B] += 2000;
        }
        else {
            payable(owner).transfer(2000);
        }
    }
    function gameresult() public view returns(uint, uint, uint) {
        return (BalanceOf[A], BalanceOf[B], address(this).balance);
    }
}

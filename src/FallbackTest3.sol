//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Receiving {
    event PrintLog(string s, address _from, uint amount);
    receive() external payable {
        emit PrintLog("now receiving...", msg.sender, msg.value);
    }
    fallback() external payable {
        emit PrintLog("now fallback...", msg.sender, msg.value);
    }
}

contract Sending {
    Receiving r = new Receiving();
    function deposit(uint amount) payable public {
        require(msg.value==amount);
    }
    function sending() public payable {
        //(bool success, bytes memory data) = address(r).call{value:11}(""); // (1) receive 호출
        (bool success, bytes memory data) = address(r).call{value:11, gas:5000}(abi.encodeWithSignature("nonExistingFn()")); // (2) fallback 호출
        require(success);
    }
    function getBalanceOfThis() public view returns(uint) {
        return address(this).balance;
    }
    function getBalanceOfReceiving() public view returns(uint) {
        return address(r).balance;
    }
}

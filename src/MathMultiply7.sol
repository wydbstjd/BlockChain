//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Multiply7 {
    event PrintLog(string s, address _from, uint _amount);
    event PrintLog(address _addr1, address _addr2);
    event PrintLog(uint);
    receive() external payable {
        emit PrintLog(msg.sender, tx.origin); // tx.origin은 트랜잭션을 최초로 생성한 외부 계정, msg.sender는 현재 msg를 전달하는 측의 주소를 뜻한다.
    }
    fallback() external payable {
        emit PrintLog(msg.sender, tx.origin);
    }
    function multiply(uint input) pure public returns(uint) {
        return input * 77;
    }
    function getAddress() view public returns(address) {
        return address(this);
    }
}

contract Math {
    Multiply7 m7 = new Multiply7();
    function deposit(uint amount) payable public {
        require(msg.value == amount);
    }
    function setM7(address payable _addr) public {
        m7 = Multiply7(_addr);
    }
    function multiply() view public returns(uint) {
        uint res = m7.multiply(8);
        return res;
    }
    function send123M7() public payable {
        payable(address(m7)).transfer(123 wei);
    }
    function getBalanceOfThis() public view returns(uint) {
        return address(this).balance;
    }
    function getBalanceOfM7() public view returns(uint) {
        return address(m7).balance;
    }
    function getAddressOfM7() view public returns(address) {
        return address(m7);
   }
}

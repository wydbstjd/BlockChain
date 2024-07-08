//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract AddressTest {
    address owner;
    address payable receiver; // 수신 계정
    uint balanceOfOwner;

    constructor() {
        owner = msg.sender;
        balanceOfOwner = owner.balance; // 잔고 설정
    }
    function deposit() payable public {
        // payable로 선언하여, 코드가 없어도 입금이 된다.
    }
    function setReceiver(address payable addr) public {
        receiver = addr;
    }
    function getReceiver() public view returns(address) {
        return receiver;
    }
    function getBalanceOfThis() public view returns(uint) {
        return address(this).balance; // 컨트랙 자체의 잔고
    }
    function getBalanceOfOwner() public view returns(uint) {
        return owner.balance;
    }
    function getBalanceOfReceiver() public view returns(uint) {
        return receiver.balance;
    }
    function send() public payable {
        require(receiver.send(111)); // 111 wei를 receiver로 송금. require()로 예외처리
    }
    function transfer() public payable {
        receiver.transfer(11111);
    }
    function callValue() public payable {
        (bool success, ) = receiver.call{value: 11111}(""); // gas를 적어주지 않으면 실제 사용량 지급
        require(success, "transfer call failed.");
        (success, ) = receiver.call{gas: 10, value: 11111}(""); //gas를 적게 설정하고 테스트
        require(success, "transfer call failed with gas 10.");
    }
}

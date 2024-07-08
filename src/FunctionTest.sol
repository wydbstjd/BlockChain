//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;
contract FunctionTest {
    int x;
    constructor() {
        x = 0;
    }
    function incrementX() public {
        x += 1; // 상태변수 x의 변경
    }
    function doubleX() public {
        X2(); // 아래에 internal로 저의. 현재 public에서 호출
    }
    function divideBy(int by) view public returns(int) {
        return x / by; // 소수를 지원하지 않는다. 0, 1/3 등을 테스트 해보자.
    }
    function getX() view public returns(int) {
        return x;
    }
    function getBalance() view public returns(uint) {
        return address(this).balance;
    }
    // payable을 붙이면 코드가 없어도 입금가능 (msg.value가 입금된다)
    function deposit() public payable {
    }
    // 외부에서 사용할 수 없다
    function X2() internal {
        x *= 2;
    }
    function getBlockNumber() view public returns(uint) {
        return block.number;
    }
}

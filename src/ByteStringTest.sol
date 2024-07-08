//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract ByteStringTest {
    bytes1 b1 = 0xFF;
    bytes2 b2 = 0xFFAA;
    bytes8 place8 = "7 hongji";
    bytes23 place23 = "7 hongji-dong jongro-gu";
    bytes place = "7 hongji-dong jongro-gu Seoul"; // 가변길이
    bytes myBytes = new bytes(3); // 0x000000
    string constant name = "jsl"; // utf-8 문자열
    function getB1() public view returns(bytes1) {
        return b1;
    }
    function getB2() public view returns(bytes2) {
        return b2;
    }
    function getB23() public view returns(bytes23) {
        return place23;
    }
    function getBytes() public view returns(bytes memory) {
        return myBytes;
    }
    function getLengOfBytes23() public view returns(uint) {
        return place23.length;
    }
    function getLenOfBytes() pure public returns(uint) {
        bytes memory bm = "7 hongji-dong jongro-gu";
        return bm.length;
    }
    function setB2(bytes2 _b2) public {
        b2 = _b2;
    }
    function setBytes() public{
        myBytes = "smu";
    }
    function getLenOfString() pure public returns(uint) {
        string memory nameLocal = "jslLocal";
        return bytes(nameLocal).length;
    }
    function getString() pure public returns(string memory) {
        string memory s = "\xec\x95\x88\xeb\x85\x95";
        return s;
    }
}

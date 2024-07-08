//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract EnumTest {
    enum Day {MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY}
    Day myDay = Day.FRIDAY;

    function getMyDay() public view returns(Day) {
        return myDay;
    }
    function setMyDay(Day d) public {
        myDay = d;
    }
    function setMyDayInt(uint d) public {
        myDay = Day(d);
    }
}

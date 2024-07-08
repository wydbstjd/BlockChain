//SPDX-License-Identifier:GPL-3.0-or-later
pragma solidity ^0.8.0;

contract CustomerContract {
    struct Customer {
        uint id;
        string name;
        string phone;
        string home;
    }

    mapping(address => Customer) customers;
    mapping(uint => address) IdToAddr;
    mapping(address => uint) Mileage;
    mapping(address => uint) BalanceOf;

    function addCustomer(uint _id, string memory _name, string memory _phone, string memory _home) public {
        require(customers[tx.origin].id == 0);
        require(IdToAddr[_id] == address(0));
        customers[tx.origin] = Customer(_id, _name, _phone, _home);
        IdToAddr[_id] = tx.origin;
        BalanceOf[tx.origin] = (tx.origin).balance;
    }
    function withdrawMoney(uint _num) public payable {
        BalanceOf[tx.origin] -= _num;
    }
    function refundMoney(uint _num) public payable {
        BalanceOf[tx.origin] += _num;
    }
    function getHomeAddress(address _addr) public view returns(string memory) {
        Customer memory c = customers[_addr];
        return c.home;
    }
    function getId(address _addr) public view returns(uint) {
        Customer memory c = customers[_addr];
        return c.id;
    }
    function addMileage(uint _amount) public {
        Mileage[tx.origin] += _amount;
    }
    function getMileage() public view returns(uint) {
        return Mileage[tx.origin];
    }
    function refundMileage(uint _amount) public {
        Mileage[tx.origin] -= _amount;
    }
}

contract OrderContract {
    struct Order {
        uint id;
        string productName;
        uint amount;
        uint cost;
        uint timestamp;
        string status;
        string home;
    }

    mapping(address => Order) orders;
    mapping(uint => address) IdToAddr;

    address owner;
    CustomerContract c;
    uint OrderCount = 0;
    uint TotalCost = 0;
    uint[] OrderIds;
    constructor() {
        c = new CustomerContract();
        owner = msg.sender;
    }
    function addCustomer(uint _id, string memory _name, string memory _phone, string memory _home) public {
        c.addCustomer(_id, _name, _phone, _home);
    }
    function getHomeAddress(address _addr) public view returns(string memory) {
        return c.getHomeAddress(_addr);
    }
    function addMileage(uint _amount) public {
        c.addMileage(_amount);
    }
    function refundMileage(uint _amount) public {
        c.refundMileage(_amount);
    }
    function withdrawMoney(uint _num) public payable {
        c.withdrawMoney(_num);
    }
    function refundMoney(uint _num) public payable {
        c.refundMoney(_num);
    }
    function placeOrder(uint _id, string memory _productName, uint _amount, uint _cost) public payable{
        require(c.getId(tx.origin) != 0, "Customer does not exist");
        require(orders[tx.origin].id == 0, "Order ID already exists");
        require(msg.value == _cost);
        
        string memory _home = c.getHomeAddress(tx.origin);
        orders[tx.origin] = Order(_id, _productName, _amount, _cost, block.timestamp, "Ordered", _home);
        IdToAddr[_id] = tx.origin;

        OrderCount += 1;
        TotalCost += _cost;
        OrderIds.push(_id);
        withdrawMoney(_cost);
        addMileage(_cost/100);
        
    }
    function getStatus(uint _id) public view returns(string memory) {
        Order memory o = orders[IdToAddr[_id]];
        return o.status;
    }
    function updateStatus(uint _id, string memory _status) public {
        require(IdToAddr[_id] == tx.origin);
        orders[IdToAddr[_id]].status = _status;
    }
    function getOrderItem() public view returns(Order[] memory) {
        Order[] memory allOrders = new Order[](OrderCount);
        for(uint i=0; i<OrderCount; i++) {
            allOrders[i] = orders[IdToAddr[OrderIds[i]]];
        }
        return allOrders;
    }
    function getOrderById(uint _id) public view returns(uint, string memory, string memory, string memory) {
        Order memory o = orders[IdToAddr[_id]];
        return (o.id, o.productName, o.status, o.home);
    }
    function getNOrder() public view returns(uint) {
        return OrderCount;
    }
    function getTotalOrderAmount() public view returns(uint) {
        return TotalCost;
    }
    function queryBalance() public view returns(uint) {
        return address(this).balance;
    }
    function refund(uint _id) public {
        require(orders[IdToAddr[_id]].id != 0);
        OrderCount -= 1;
        TotalCost -= orders[IdToAddr[_id]].cost;
        orders[IdToAddr[_id]].status = "Refunded";
        refundMileage(orders[IdToAddr[_id]].cost/100);
        payable(owner).transfer(orders[IdToAddr[_id]].cost);
    }
}

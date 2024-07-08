//SPDX-License-Identifier:GPL-3.0-or-later
pragma solidity ^0.8.0;

contract CustomerContract {
    struct Customer {
        uint256 id;
        string name;
        string phone;
        string home;
    }

    mapping(address => Customer) customers;
    mapping(uint256 => address) customerIdToAddress;
    mapping(address => uint256) mileage;
    mapping(address => uint256) balanceOf;
    
    function addMileage(address addr, uint amount) public {
        mileage[addr] += amount;
    }

    function refundMileage(address addr, uint amount) public {
        mileage[addr] -= amount;
    }

    function withdrawMoney(address addr, uint num) public payable {
        balanceOf[addr] -= num;
    }

    function refundMoney(address addr, uint num) public payable {
        balanceOf[addr] += num;
    }

    function addCustomer(uint256 _id, string memory _name, string memory _phone, string memory _home) public {
        require(customers[tx.origin].id == 0, "Customer already exists");
        require(customerIdToAddress[_id] == address(0), "Customer ID already exists");

        customers[tx.origin] = Customer(_id, _name, _phone, _home);
        customerIdToAddress[_id] = tx.origin;
        balanceOf[tx.origin] = (tx.origin).balance;
    }

    function getHomeAddress(address _addr) public view returns(string memory) {
        Customer memory m = customers[_addr];
        return m.home;
    }

    function getId() public view returns(uint256) {
        return customers[tx.origin].id;
    }
}

contract OrderContract {
    struct Order {
        uint256 id;
        string product;
        uint256 quantity;
        uint256 amount;
        uint256 timestamp;
        string status;
        string home;
    }

    address owner;
    CustomerContract private c;
    mapping(uint256 => Order) private orders;
    mapping(uint256 => address) private orderIdToCustomer;
    uint256 private orderCount;
    uint private totalOrderAmount;
    uint256[] private orderIds;

    constructor() {
        c = new CustomerContract();
        owner = msg.sender;
    }

    function addMileage(address addr, uint amount) public {
        c.addMileage(addr, amount);
    }

    function refundMileage(address addr, uint amount) public {
        c.refundMileage(addr, amount);
    }

    function withdrawMoney(address addr, uint num)public payable{
        c.withdrawMoney(addr, num);
    }
    
    function refundMoney(address addr, uint num)public payable{
        c.refundMoney(addr, num);
    }

    function addCustomer(uint256 _id, string memory _name, string memory _phone, string memory _home) public {
        c.addCustomer(_id, _name, _phone, _home);
    }

    function getHomeAddress(address _addr) public view returns(string memory) {
        return c.getHomeAddress(_addr);
    }
    
    function placeOrder(uint256 _id, string memory _product, uint256 _quantity, uint256 _amount) public payable{
        require(c.getId() != 0, "Customer does not exist");
        require(orders[_id].id == 0, "Order ID already exists");

        string memory homeaddress = c.getHomeAddress(tx.origin);
        orders[_id] = Order(_id, _product, _quantity, _amount, block.timestamp, "Ordered", homeaddress);
        orderIdToCustomer[_id] = tx.origin;

        addMileage(tx.origin, _amount/100);
        orderCount++;
        totalOrderAmount += _amount;
        require(msg.value == _amount);
        withdrawMoney(tx.origin, _amount);
        orderIds.push(_id);
    }

    function getOrderById(uint256 _id) public view returns (uint256, string memory, string memory, string memory) {
        Order memory o = orders[_id];
        return (o.id, o.product, o.status, o.home);
    }

    function getOrderItem() public view returns (Order[] memory) {
        Order[] memory allOrders = new Order[](orderCount);

        for (uint256 i = 0; i < orderCount; i++) {
            allOrders[i] = orders[orderIds[i]];
        }
        return allOrders;
    }

    function updateStatus(uint _id, string memory _status) public {
        require(orderIdToCustomer[_id] == tx.origin);
        orders[_id].status = _status;
    }

    function getNOrder() public view returns (uint256) {
        return orderCount;
    }

    function getTotalOrderAmount() public view returns (uint256) {
        return totalOrderAmount;
    }

    function queryBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function refund(uint256 _id) public payable {
        require(orderIdToCustomer[_id] == msg.sender);
        orders[_id].status = "Refunded";
        orderCount -= 1;
        totalOrderAmount -= orders[_id].amount;
        refundMileage(tx.origin, orders[_id].amount/100);
        refundMoney(tx.origin, orders[_id].amount);
        payable(owner).transfer(orders[_id].amount);
    }
}

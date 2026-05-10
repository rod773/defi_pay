// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeFiPay is Ownable {
    // Store product prices in ETH (using wei for precision)
    mapping(uint256 => uint256) public productPrices; // productId => price in wei
    
    // Track purchases
    struct Purchase {
        address buyer;
        uint256 productId;
        uint256 timestamp;
        bool fulfilled;
    }
    
    mapping(uint256 => Purchase[]) public purchases; // buyerAddress => purchases
    
    // Event for tracking purchases
    event PurchaseMade(
        address indexed buyer,
        uint256 indexed productId,
        uint256 amount,
        uint256 timestamp
    );
    
    // Constructor
    constructor() {
        // Set some example product prices (in wei)
        // 0.01 ETH = 10000000000000000 wei
        productPrices[1] = 10000000000000000; // Product 1: 0.01 ETH
        productPrices[2] = 50000000000000000; // Product 2: 0.05 ETH
        productPrices[3] = 5000000000000000;  // Product 3: 0.005 ETH
        productPrices[4] = 100000000000000000; // Product 4: 0.1 ETH
    }
    
    // Function to purchase a product
    function purchaseProduct(uint256 productId) external payable {
        require(productPrices[productId] > 0, "Product not available");
        
        uint256 price = productPrices[productId];
        require(msg.value >= price, "Insufficient payment");
        
        // Record the purchase
        uint256 purchaseId = purchases[msg.sender].length;
        purchases[msg.sender].push(Purchase({
            buyer: msg.sender,
            productId: productId,
            timestamp: block.timestamp,
            fulfilled: false
        }));
        
        // Emit event
        emit PurchaseMade(msg.sender, productId, msg.value, block.timestamp);
        
        // In a real implementation, you would transfer funds to a merchant address
        // For simplicity, we're keeping them in the contract
        // You could withdraw them later using the withdraw function
    }
    
    // Function to get user's purchases
    function getUserPurchases(address user) external view returns (Purchase[] memory) {
        return purchases[user];
    }
    
    // Function to mark purchase as fulfilled (to be called after shipping)
    function fulfillPurchase(address user, uint256 purchaseIndex) external onlyOwner {
        require(purchaseIndex < purchases[user].length, "Invalid purchase index");
        purchases[user][purchaseIndex].fulfilled = true;
    }
    
    // Function to withdraw funds (owner only)
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        payable(owner()).transfer(balance);
    }
    
    // Receive Ether function
    receive() external payable {
        // This function is called when the contract receives Ether directly
        // We could revert here to prevent direct deposits, or allow them
        // For simplicity, we'll allow them but not record as a purchase
    }
    
    // Fallback function
    fallback() external payable {
        // Same as receive
    }
}
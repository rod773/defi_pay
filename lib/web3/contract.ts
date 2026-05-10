import { ethers } from "ethers";

// Extend Window interface to include ethereum property
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Contract ABI (simplified for our use case)
const abi = [
  "function purchaseProduct(uint256 productId) payable",
  "function productPrices(uint256) view returns (uint256)",
  "function getUserPurchases(address user) view returns (tuple(address buyer, uint256 productId, uint256 timestamp, bool fulfilled)[])",
  "event PurchaseMade(address indexed buyer, uint256 indexed productId, uint256 amount, uint256 timestamp)"
];

// Contract address (this would be deployed to a testnet or mainnet in a real app)
const contractAddress = "0xYourContractAddressHere";

// Create a provider (using Ethereum mainnet for example - in real app, use a testnet or local network)
const getProvider = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    return new ethers.BrowserProvider(window.ethereum);
  }
  // Fallback to a public provider (not recommended for production)
  return new ethers.JsonRpcProvider("https://eth.llamarpc.com");
};

// Export the contract instance
export const getContract = async () => {
  const provider = getProvider();
  
  // If using MetaMask or similar, we need to get the signer
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  }
  
  // For read-only operations
  return new ethers.Contract(contractAddress, abi, provider);
};

export const getProductPriceInEth = async (productId: number): Promise<number> => {
  try {
    const contract = await getContract();
    const priceInWei = await contract.productPrices(productId);
    return Number(ethers.formatEther(priceInWei));
  } catch (error) {
    console.error("Error fetching product price:", error);
    return 0;
  }
};

export const purchaseProduct = async (productId: number, amountInEth: number) => {
  try {
    const contract = await getContract();
    const amountInWei = ethers.parseEther(amountInEth.toString());
    
    const tx = await contract.purchaseProduct(productId, { value: amountInWei });
    await tx.wait();
    
    return tx.hash;
  } catch (error) {
    console.error("Error purchasing product:", error);
    throw error;
  }
};

export const getUserPurchases = async (address: string) => {
  try {
    const contract = await getContract();
    const purchases = await contract.getUserPurchases(address);
    return purchases;
  } catch (error) {
    console.error("Error fetching user purchases:", error);
    return [];
  }
};
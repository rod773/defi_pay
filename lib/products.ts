// Mock product data
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // in ETH
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "DeFi T-Shirt",
    description: "Show your support for decentralized finance with this stylish t-shirt.",
    price: 0.01, // in ETH
    image: "/images/tshirt.jpg",
    category: "Clothing",
  },
  {
    id: 2,
    name: "Crypto Hoodie",
    description: "Stay warm and show your crypto pride.",
    price: 0.05, // in ETH
    image: "/images/hoodie.jpg",
    category: "Clothing",
  },
  {
    id: 3,
    name: "Blockchain Mug",
    description: "Start your day with a blockchain-inspired mug.",
    price: 0.005, // in ETH
    image: "/images/mug.jpg",
    category: "Accessories",
  },
  {
    id: 4,
    name: "NFT Art Print",
    description: "Limited edition NFT-inspired art print.",
    price: 0.1, // in ETH
    image: "/images/artprint.jpg",
    category: "Art",
  },
];
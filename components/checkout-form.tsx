import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart-context";

export function CheckoutForm() {
  const { cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    walletAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, this would interact with a DeFi smart contract
      // For now, we'll simulate a transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate successful transaction
      const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64);
      setTransactionHash(mockTxHash);
      
      // Clear cart after successful purchase
      clearCart();
    } catch (err) {
      setError("Transaction failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
       <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Checkout
            </h2>
            <p className="text-gray-600">
              Total: <span className="font-semibold text-indigo-600">${cartTotal.toFixed(
                2
              )} ETH</span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <Label htmlFor="address">Shipping Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter your street address"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Enter your city"
            />
          </div>
          
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              placeholder="Enter ZIP code"
              maxLength={5}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="walletAddress">Wallet Address</Label>
          <Input
            id="walletAddress"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleChange}
            required
            placeholder="Enter your Ethereum wallet address"
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll charge {cartTotal} ETH to this address
          </p>
        </div>
      </div>

      {transactionHash && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <h3 className="text-green-800 font-bold mb-2">
            Payment Successful!
          </h3>
          <p className="mb-2">
            Transaction Hash: <code className="bg-gray-100 px-1 rounded">{transactionHash}</code>
          </p>
          <p className="text-green-600">
            Thank you for your purchase! Your order has been processed.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <h3 className="text-red-800 font-bold mb-2">
            Payment Failed
          </h3>
          <p>{error}</p>
        </div>
      )}

       <Button
         type="submit"
         disabled={isSubmitting}
         className="w-full"
       >
         {isSubmitting ? "Processing Payment..." : "Complete Purchase"}
       </Button>
    </form>
  );
}
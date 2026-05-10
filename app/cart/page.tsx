"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { CheckoutForm } from "@/components/checkout-form";

export default function CartPage() {
  const { cart, cartCount, cartTotal, removeItem, updateQuantity, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Add some products to your cart to get started.
          </p>
          <Link href="/" className="text-indigo-600 hover:text-indigo-500">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-500">
            ← Continue Shopping
          </Link>
        </div>
        
        <div className="space-y-6">
          {cart.map((item) => (
            <Card key={item.id} className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <div className="shrink-0">
                    <div className="h-16 w-16 rounded-md bg-indigo-50 flex items-center justify-center">
                      <span className="text-indigo-500 text-xl">{item.id}</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <CardTitle className="text-lg font-medium text-gray-900">{item.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-500 line-clamp-2">
                      {item.description || `Quantity: ${item.quantity}`}
                    </CardDescription>
                    <div className="flex items-baseline mt-2">
                      <span className="mr-2 text-sm text-gray-500">Qty:</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          −
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-sm font-medium text-indigo-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium text-gray-900">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm font-medium text-gray-900">
              <span>Estimated Total:</span>
              <span className="text-indigo-600 font-semibold">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="pt-4">
              <Button
                onClick={() => clearCart()}
                className="w-full"
                variant="outline"
              >
                Clear Cart
              </Button>
              <Button
                className="w-full mt-2"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
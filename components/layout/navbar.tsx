'use client';

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 text-2xl font-bold text-indigo-600">
              DeFiPay
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className="text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <Link href="/products" className="text-gray-500 hover:text-gray-900">
              Products
            </Link>
            <Link href="/cart" className="relative text-gray-500 hover:text-gray-900">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center text-xs font-medium rounded-full bg-indigo-600 text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-900">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
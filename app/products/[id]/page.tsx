"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    );
  }

  const { addItem } = useCart();

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/products" className="text-sm text-indigo-600 hover:text-indigo-500">
            ← Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:pr-8">
            <div className="relative h-[400px] w-full">
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={600}
                className="rounded-xl object-cover"
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/50 rounded-xl" />
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.description}</p>
            <div className="mb-6">
              <span className="text-2xl font-bold text-indigo-600">
                {product.price} ETH
              </span>
            </div>
            <div className="mb-6">
              <Button
                onClick={() => addItem(product)}
                className="w-full"
              >
                Add to Cart
              </Button>
            </div>
            
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Product Details
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This is a high-quality product made with premium materials. 
                Each item is carefully crafted to ensure durability and style.
                By purchasing with cryptocurrency, you're supporting the 
                decentralized economy and enjoying fast, secure transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
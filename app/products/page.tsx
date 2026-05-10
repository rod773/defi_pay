import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          All Products
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

    // For initial animation when in view
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {
      once: true,
      amount: 0.2,
    });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{
        scale: hasAnimated ? 1 : 0.8,
        opacity: hasAnimated ? 1 : 0,
        y: hasAnimated ? 0 : 50
      }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0
      }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="hover:-translate-y-1 hover:shadow-xl"
    >
      <Card className="h-full">
        <CardHeader className="pb-0">
           <div className="relative">
             <motion.img
               src={product.image}
               alt={product.name}
               width={300}
               height={200}
               className="rounded-t-lg object-cover"
               initial={{ scale: 0.9 }}
               whileHover={{ scale: 1.05 }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/50" />
           </div>
        </CardHeader>
        <CardContent className="px-6 pt-4 pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900">{product.name}</CardTitle>
          <p className="mt-2 line-clamp-2 text-gray-600">{product.description}</p>
          <div className="mt-4 flex items-baseline">
            <span className="text-xl font-bold text-indigo-600">
              {product.price} ETH
            </span>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-4">
          <Button
            onClick={() => addItem(product)}
            className="w-full"
            variant="outline"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
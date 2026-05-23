"use client";
import SingleProduct from "@/components/SingleProduct";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSupabase } from "../../../../hooks/useSupabase";

const ProductPage = () => {
  const { id } = useParams();
  const { singleProduct, getProductsById } = useSupabase();
  useEffect(() => {
    if (!id) return;
    const productId = Array.isArray(id) ? id[0] : id;
    getProductsById(Number(productId));
  }, [getProductsById, id]);
  return (
    <div>
      <SingleProduct singleProduct={singleProduct} />
    </div>
  );
};

export default ProductPage;

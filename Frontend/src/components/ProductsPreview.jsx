import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cart/cartSlice";

import ProductPreviewCard from "./ProductPreviewCard";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductsPreview = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onAddProduct = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto pb-4 w-2/3 bg-black">
      <Carousel responsive={responsive}>
        {products.length > 0 &&
          products.map((product, index) => (
            <div className="w-full p-3" key={index}>
              <ProductPreviewCard
                product={product}
                onAddProduct={onAddProduct}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default ProductsPreview;

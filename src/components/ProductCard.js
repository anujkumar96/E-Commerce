import React, { useState } from "react";
import ProductModal from "./ProductModal";
import "./ProductCard.css";
import { Camelcasing } from './../utils/reusableFunction';

const ProductCard = ({ product, darkMode }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div
        className={`product-card ${darkMode ? 'dark' : 'light'}`}
        onClick={handleCardClick}
      >
        <img src={product.image} alt={product.title} className="product-poster" />
        <div className="product-info">
          <p className="product-overview">Category : <b>{Camelcasing(product.category)}</b></p>
          <h2 className="product-title">{product.title}</h2>
          <p className="product-overview">${product.price}</p>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} darkMode={darkMode} />
      )}
    </>
  );
};

export default ProductCard;

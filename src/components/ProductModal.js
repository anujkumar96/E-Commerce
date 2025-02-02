import React from "react";
import "./ProductModal.css";

const ProductModal = ({ product, onClose, darkMode }) => {
  if (!product) return null;

  return (
    <div className={`modal-overlay ${darkMode ? 'dark' : 'light'}`} onClick={onClose}>
      <div className={`modal-content ${darkMode ? 'dark' : 'light'}`} onClick={(e) => e.stopPropagation()}>
        <button className={`close-btn ${darkMode ? 'dark' : 'light'}`} onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <img src={product.image} alt={product.title} className="modal-image" />
          <h2 className={`modal-title ${darkMode ? 'dark' : 'light'}`}>{product.title || ""}</h2>
        </div>

        <p className={`modal-description ${darkMode ? 'dark' : 'light'}`}>{product.description}</p>

        <p className={`modal-category ${darkMode ? 'dark' : 'light'}`}><strong>Category:</strong> {product.category || ""}</p>

        <p className={`modal-price ${darkMode ? 'dark' : 'light'}`}><strong>Price:</strong> ${product.price || ""}</p>

        <p className={`modal-rating ${darkMode ? 'dark' : 'light'}`}>
          <strong>Rating:</strong> ⭐ {product.rating.rate} ({product.rating.count || ""} reviews)
        </p>
      </div>
    </div>
  );
};

export default ProductModal;

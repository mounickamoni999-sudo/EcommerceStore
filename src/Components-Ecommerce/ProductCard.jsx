import "./ProductCard.css";

const ProductCard = ({
  product,
  quantity,
  onAddToCart,
  onIncrease,
  onDecrease,
}) => {
  return (
    <article className="ProductCard">
      <div className="ProductCard-imageContainer">
        <img
          className="ProductCard-image"
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className="ProductCard-content">
        <span className="ProductCard-category">
          {product.category}
        </span>

        <h3 className="ProductCard-title">
          {product.title}
        </h3>

        <div className="ProductCard-footer">
          <span className="ProductCard-price">
            ₹{product.price}
          </span>

          {quantity === 0 ? (
            <button
              className="ProductCard-button"
              type="button"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          ) : (
            <div className="ProductCard-quantity">
              <button
                type="button"
                onClick={() => onDecrease(product.id)}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() => onIncrease(product.id)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
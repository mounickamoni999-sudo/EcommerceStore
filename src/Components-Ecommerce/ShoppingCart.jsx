import "./ShoppingCart.css";

const ShoppingCart = ({
  cartItems,
  cartCount,
  cartSubtotal,
  tax,
  shipping,
  cartTotal,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <section className="ShoppingCart">
      <div className="ShoppingCart-header">
        <div>
          <h2>Your Shopping Cart</h2>
          <p>{cartCount} items in your cart</p>
        </div>

        <span className="ShoppingCart-count">
          {cartCount}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="ShoppingCart-empty">
          <h3>Your cart is empty</h3>
          <p>
            Add products from the store to see them here.
          </p>
        </div>
      ) : (
        <div className="ShoppingCart-layout">
          <div className="ShoppingCart-items">
            {cartItems.map((item) => (
              <div
                className="ShoppingCart-item"
                key={item.id}
              >
                <img
                  className="ShoppingCart-image"
                  src={item.thumbnail}
                  alt={item.title}
                />

                <div className="ShoppingCart-details">
                  <h3>{item.title}</h3>

                  <p className="ShoppingCart-price">
                    ₹{item.price} each
                  </p>

                  <div className="ShoppingCart-actions">
                    <div className="ShoppingCart-quantity">
                      <button
                        type="button"
                        onClick={() => onDecrease(item.id)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => onIncrease(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="ShoppingCart-remove"
                      type="button"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <strong className="ShoppingCart-itemTotal">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          <aside className="ShoppingCart-billing">
            <h3>Order Summary</h3>

            <div className="ShoppingCart-billingRow">
              <span>Items</span>
              <strong>{cartCount}</strong>
            </div>

            <div className="ShoppingCart-billingRow">
              <span>Subtotal</span>
              <strong>
                ₹{cartSubtotal.toFixed(2)}
              </strong>
            </div>

            <div className="ShoppingCart-billingRow">
              <span>Tax (5%)</span>
              <strong>
                ₹{tax.toFixed(2)}
              </strong>
            </div>

            <div className="ShoppingCart-billingRow">
              <span>Shipping</span>
              <strong>
                ₹{shipping.toFixed(2)}
              </strong>
            </div>

            <div className="ShoppingCart-divider"></div>

            <div className="ShoppingCart-total">
              <span>Total</span>
              <strong>
                ₹{cartTotal.toFixed(2)}
              </strong>
            </div>

            <button
              className="ShoppingCart-checkout"
              type="button"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </section>
  );
};

export default ShoppingCart;
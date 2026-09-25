import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ShoppingCart from "./ShoppingCart";
import FashionBanner from "./FashionBanner";
import "./EcommerceStore.css";

const EcommerceStore = () => {
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("ecommerceCart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "ecommerceCart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=8"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const handleIncrease = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartSubtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const tax = cartSubtotal * 0.05;

  const shipping = cartSubtotal > 0 ? 50 : 0;

  const cartTotal =
    cartSubtotal + tax + shipping;

  if (loading) {
    return (
      <div className="EcommerceStore">
        <p className="EcommerceStore-loading">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="EcommerceStore">
        <p className="EcommerceStore-error">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="EcommerceStore">
      {/* Header */}
      <header className="EcommerceStore-header">
        <button
          className="EcommerceStore-brand"
          type="button"
          onClick={() => setIsCartOpen(false)}
        >
          <h1>E-Commerce Store</h1>
          <p>Shop your favorite products</p>
        </button>

        <button
          className="EcommerceStore-cartButton"
          type="button"
          onClick={() => setIsCartOpen(true)}
        >
          <span>Cart</span>
          <strong>{cartCount}</strong>
        </button>
      </header>

      {/* Main Content */}
      <main className="EcommerceStore-main">
        {!isCartOpen ? (
          <>
            {/* Fashion Banner */}
            <FashionBanner />

            {/* Products */}
            <section
              className="EcommerceStore-productsSection"
              id="products"
            >
              <div className="EcommerceStore-sectionHeader">
                <h2>Products</h2>
                <p>
                  Explore our latest products
                </p>
              </div>

              <div className="EcommerceStore-productGrid">
                {products.map((product) => {
                  const cartItem = cartItems.find(
                    (item) =>
                      item.id === product.id
                  );

                  const quantity = cartItem
                    ? cartItem.quantity
                    : 0;

                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={quantity}
                      onAddToCart={
                        handleAddToCart
                      }
                      onIncrease={
                        handleIncrease
                      }
                      onDecrease={
                        handleDecrease
                      }
                    />
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          /* Shopping Cart */
          <ShoppingCart
            cartItems={cartItems}
            cartCount={cartCount}
            cartSubtotal={cartSubtotal}
            tax={tax}
            shipping={shipping}
            cartTotal={cartTotal}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        )}
      </main>
    </div>
  );
};

export default EcommerceStore;
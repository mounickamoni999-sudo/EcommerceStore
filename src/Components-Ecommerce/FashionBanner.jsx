import "./FashionBanner.css";

const FashionBanner = () => {
  return (
    <section className="FashionBanner">
      <div className="FashionBanner-content">
        <span className="FashionBanner-label">
          NEW COLLECTION
        </span>

        <h2>
          New Season
          <br />
          Fashion
        </h2>

        <p>
          Discover stylish looks made for every occasion.
        </p>

        <button
          className="FashionBanner-button"
          type="button"
          onClick={() => {
            document
              .getElementById("products")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default FashionBanner;
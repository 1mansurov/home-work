import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: quantity,
    }));
  };

  const calculateTotals = () => {
    let subtotal = 0;
    products.forEach((product) => {
      const quantity = cart[product.id] || 0;
      subtotal += quantity * product.price;
    });
    const tax = subtotal * 0.12;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <div className="container">
      <h1>Mahsulotlar Savatchasi</h1>
      <div>
        {products.map((product) => (
          <div key={product.id} className="product">
            <div>
              <strong>{product.title}</strong>
              <p>Narxi: {product.price} so'm</p>
            </div>
            <div>
              <input
                type="number"
                min="0"
                value={cart[product.id] || 0}
                onChange={(e) =>
                  updateQuantity(product.id, parseInt(e.target.value))
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="totals">
        <p>
          Oraliq Jami (Subtotal): <span>{subtotal.toFixed(2)}</span> so'm
        </p>
        <p>
          QQS (12%): <span>{tax.toFixed(2)}</span> so'm
        </p>
        <p>
          Jami (Total): <span>{total.toFixed(2)}</span> so'm
        </p>
      </div>

      <button>Buyurtma Berish</button>
    </div>
  );
}

export default App;

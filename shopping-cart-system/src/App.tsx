import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store";
import "./App.css";
import type { Product, Cart } from "./types";
import { updateProducts } from "./slices/productsSlice";
import { addToCart, removeItem } from "./slices/cartSlice";

type CartState = Record<number, number>; // productId -> quantity

export default function App() {
  const [serverTotal, setServerTotal] = useState<number | null>(null);
  const [loadingTotal, setLoadingTotal] = useState(false);
  const dispatch = useDispatch();
  const { addedItems } = useSelector((state: RootState) => state.cart);
  const { products } = useSelector((state: RootState) => state.products);
  console.log(products);
  console.log("Testing");
  console.log(addedItems);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/products");
      // const data: Product[] = await res.json();
      const mockData: Product[] = [
        { id: 1, name: "Burger", price: 5 },
        { id: 2, name: "Pizza", price: 7 },
        { id: 3, name: "Soda", price: 2 },
      ];
      dispatch(updateProducts(mockData));
    })();
  }, []);

  return (
    <div className="container">
      <h1>Simple Shopping Cart</h1>

      <div className="grid">
        <section>
          <h2>Products</h2>
          {products.length === 0 && <p>Loading products…</p>}
          <ul className="products">
            {products.map((p) => (
              <li key={p.id} className="product-card">
                <div>
                  <strong>{p.name}</strong>
                  <div>${p.price.toFixed(2)}</div>
                </div>
                <button onClick={() => dispatch(addToCart(p))}>
                  Add to cart
                </button>
              </li>
            ))}
          </ul>
        </section>

        {
          <section>
            <h2 className="italic">Cart</h2>
            {addedItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th style={{ width: 120 }}>Quantity</th>
                    <th>Line Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {addedItems.map(({ product, quantity }) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{quantity}</td>
                      <td>${(product.price * quantity).toFixed(2)}</td>
                      <td>
                        <button onClick={() => dispatch(removeItem(product))}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} style={{ textAlign: "right" }}>
                      <strong>Client Total:</strong>
                    </td>
                    <td colSpan={2}>
                      <strong>
                        $
                        {addedItems
                          .reduce(
                            (sum, { product, quantity }) =>
                              sum + product.price * quantity,
                            0
                          )
                          .toFixed(2)}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </section>
        }
      </div>
    </div>
  );
}

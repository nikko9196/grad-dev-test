import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import type { RootState } from "../store";

export default function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  return (
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
            <button onClick={() => dispatch(addToCart(p))}>Add to cart</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

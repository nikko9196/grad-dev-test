import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import type { RootState } from "../store";

export default function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  return (
    <section>
      <h2 className="h4 mb-4">Product List</h2>
      {products.length === 0 && <p>Loading products…</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td className="text-end">
                <button
                  className="btn btn-primary"
                  onClick={() => dispatch(addToCart(p))}
                >
                  Add to cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

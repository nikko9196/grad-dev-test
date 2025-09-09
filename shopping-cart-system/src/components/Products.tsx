import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import type { RootState } from "../store";

export default function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Products</h2>
      {products.length === 0 && <p>Loading products…</p>}
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between px-2 py-2 bg-transparent"
          >
            <p className="font-medium mr-8 w-1/2">{p.name}</p>

            <p className="text-gray-700 font-semibold mr-6">
              ${p.price.toFixed(2)}
            </p>
            <button
              className="mx-10 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => dispatch(addToCart(p))}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

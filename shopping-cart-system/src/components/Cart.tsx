import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeItem } from "../slices/cartSlice";
import type { RootState } from "../store";

export default function Cart() {
  const dispatch = useDispatch();
  const { addedItems } = useSelector((state: RootState) => state.cart);
  const [open, setOpen] = useState(false);

  // Calculate total quantity of items in cart
  const totalItems = addedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section>
      <div className="flex justify-end">
        <button
          className="relative mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide Cart " : "Show Cart "}
          <span className="ml-2 inline-block bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
            ({totalItems})
          </span>
        </button>
      </div>
      {open && (
        <>
          <h2>Cart</h2>
          {addedItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table className="cart-table w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-3">Item</th>
                  <th className="py-2 px-3">Price</th>
                  <th className="py-2 px-3">Quantity</th>
                  <th className="py-2 px-3">Line Total</th>
                  <th className="py-2 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {addedItems.map(({ product, quantity }) => (
                  <tr key={product.id}>
                    <td className="py-2 px-3">{product.name}</td>
                    <td className="py-2 px-3">${product.price.toFixed(2)}</td>
                    <td className="py-2 px-3">{quantity}</td>
                    <td className="py-2 px-3">
                      ${(product.price * quantity).toFixed(2)}
                    </td>
                    <td className="py-2 px-3">
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => dispatch(removeItem(product))}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-right font-bold py-2 px-3">
                    Total Price:
                  </td>
                  <td colSpan={2} className="font-bold py-2 px-3">
                    $
                    {addedItems
                      .reduce(
                        (sum, { product, quantity }) =>
                          sum + product.price * quantity,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </>
      )}
    </section>
  );
}

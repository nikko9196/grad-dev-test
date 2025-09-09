import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../slices/cartSlice";
import type { RootState } from "../store";

export default function Cart() {
  const dispatch = useDispatch();
  const { addedItems } = useSelector((state: RootState) => state.cart);

  return (
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
  );
}

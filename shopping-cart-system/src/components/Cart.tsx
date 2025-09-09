import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeItem } from "../slices/cartSlice";
import type { RootState } from "../store";

export default function Cart() {
  const dispatch = useDispatch();
  const { addedItems } = useSelector((state: RootState) => state.cart);
  const [open, setOpen] = useState(false);

  const totalItems = addedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section>
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-danger position-relative"
          style={{ minWidth: "150px" }} // Add fixed width here
          onClick={() => setOpen((v) => !v)}
        >
          <span className="me-4">{open ? "Hide Cart" : "Show Cart"}</span>
          <span className="badge bg-light text-danger position-absolute end-0 me-2 top-50 translate-middle-y">
            {totalItems}
          </span>
        </button>
      </div>
      {open && (
        <>
          <h2 className="h4">Cart</h2>
          {addedItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
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
                      <button
                        className="btn btn-danger btn-sm"
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
                  <td colSpan={3} className="text-end fw-bold">
                    Total Price:
                  </td>
                  <td colSpan={2} className="fw-bold">
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

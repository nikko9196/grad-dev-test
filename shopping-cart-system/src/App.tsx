import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProducts } from "./slices/productsSlice";
import Products from "./components/Products";
import Cart from "./components/Cart";
import "./App.css";

const mockData = [
  { id: 1, name: "Burger", price: 5.50 },
  { id: 2, name: "Pizza", price: 7.00 },
  { id: 3, name: "Soda", price: 2.50 },
];

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // Fetch or mock products here
      fetch("http://localhost:4000/api/products")
        .then((res) => res.json())
        .then((data) => dispatch(updateProducts(data)))
        .catch(() => dispatch(updateProducts(mockData)));
    })();
  }, []);

  return (
    <div className="container">
      <h1>Simple Shopping Cart</h1>
      <div className="grid">
        <Products />
        <Cart />
      </div>
    </div>
  );
}

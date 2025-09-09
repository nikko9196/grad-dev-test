import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProducts } from "./slices/productsSlice";
import Products from "./components/Products";
import Cart from "./components/Cart";
import "./App.css";

const mockData = [
  { id: 1, name: "Burger", price: 16.5 },
  { id: 2, name: "Pizza", price: 22.5 },
  { id: 3, name: "Soda", price: 4.5 },
  { id: 4, name: "Fries", price: 6.5 },
  { id: 5, name: "Salad", price: 8.0 },
  { id: 6, name: "Ice Cream", price: 4.0 },
];

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // Fetch Product List from server or mock products:
      fetch("http://localhost:4000/api/products")
        .then((res) => res.json())
        .then((data) => dispatch(updateProducts(data)))
        .catch(() => dispatch(updateProducts(mockData)));
    })();
  }, []);

  return (
    <div className="container position-relative">
      <h1>Simple Shopping Cart</h1>
      <Cart />
      <Products />
    </div>
  );
}

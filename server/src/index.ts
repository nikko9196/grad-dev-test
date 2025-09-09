import express from "express";
import cors from "cors";

type Product = { id: number; name: string; price: number };
type PriceItem = { productId: number; quantity: number };

const app = express();
app.use(cors());
app.use(express.json());

const PRODUCTS: Product[] = [
  { id: 1, name: "Coffee Beans 250g", price: 12.50 },
  { id: 2, name: "Loose Leaf Tea 100g", price: 9.75 },
  { id: 3, name: "Ceramic Mug", price: 14.00 },
  { id: 4, name: "French Press", price: 29.90 },
  { id: 5, name: "Reusable Coffee Filter", price: 7.25 },
  { id: 6, name: "Travel Tumbler", price: 18.00 },
];

app.get("/api/products", (_req, res) => {
  res.json(PRODUCTS);
});

app.post("/api/price", (req, res) => {
  const items: PriceItem[] = req.body?.items;
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "`items` array required" });
  }

  let total = 0;
  for (const { productId, quantity } of items) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return res.status(400).json({ error: `Invalid productId: ${productId}` });
    }
    if (
      typeof quantity !== "number" ||
      quantity <= 0 ||
      !Number.isFinite(quantity)
    ) 
      continue;
    total += product.price * quantity;
  }

  res.json({ total: Number(total.toFixed(2)) });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

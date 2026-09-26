import express from "express";
import cors from "cors";
import path from "path";

import { drinks } from "./data/drinks";

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use(
  "/images/api-drinks",
  express.static(path.join(process.cwd(), "assets/images/api-drinks")),
);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Drinkly API is running",
  });
});

app.get("/api/drinks", (_req, res) => {
  res.json(drinks);
});

app.get("/api/drinks/:id", (req, res) => {
  const drink = drinks.find((item) => item.id === req.params.id);

  if (!drink) {
    res.status(404).json({
      success: false,
      message: "Drink not found",
    });

    return;
  }

  res.json(drink);
});

app.listen(PORT, () => {
  console.log(`Drinkly API running at http://localhost:${PORT}`);
});

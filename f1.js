const express = require('express');
const app = express();

const PORT = 5000;

app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 599 },
    { id: 3, name: 'Headphones', price: 199 }
  ];

  res.status(200).json({
    success: true,
    data: products
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

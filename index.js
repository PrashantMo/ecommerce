require('dotenv').config();
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const { databaseConnection } = require('./middleware/databaseConnection');
const mongoClient = new MongoClient(MONGODB_URI);
const data=[
  {
    "title": "Pro Wireless Noise-Canceling Headphones",
    "sku": "HEAD-PRO-001",
    "description": "High-fidelity audio with advanced active noise cancellation and 40-hour battery life.",
    "price": 199.99,
    "category": "Electronics",
    "subCategories": ["Audio", "Accessories"],
    "brand": "SoundWave",
    "stockQuantity": 45,
    "images": [
      "https://example.com",
      "https://example.com"
    ],
    "specifications": {
      "color": "Matte Black",
      "connectivity": "Bluetooth 5.2",
      "weight": "250g"
    },
    "ratings": {
      "averageRating": 4.7,
      "reviewCount": 12
    },
    "reviews": [
      {
        "userId": "65a1b2c3d4e5f67890123456",
        "username": "Alex_Dev",
        "rating": 5,
        "comment": "Amazing bass response and the ANC works perfectly in noisy offices!",
        "createdAt": "2026-02-15T08:30:00Z"
      }
    ],
    "isActive": true,
    "createdAt": "2026-01-10T14:22:18Z"
  },
  {
    "title": "Minimalist Leather Backpack",
    "sku": "BAG-LEATH-002",
    "description": "Water-resistant, genuine leather backpack featuring a 15-inch laptop sleeve.",
    "price": 89.50,
    "category": "Apparel & Fashion",
    "subCategories": ["Bags", "Travel Gear"],
    "brand": "UrbanCraft",
    "stockQuantity": 120,
    "images": [
      "https://example.com"
    ],
    "specifications": {
      "color": "Tan Brown",
      "material": "Full-Grain Leather",
      "capacity": "20L"
    },
    "ratings": {
      "averageRating": 4.2,
      "reviewCount": 8
    },
    "reviews": [],
    "isActive": true,
    "createdAt": "2026-02-01T11:05:00Z"
  }
]
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(databaseConnection(mongoClient));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post('/insert', async (req, res) => {
  try {
    const db = mongoClient.db('eco');
    const collection = db.collection('products');
    await collection.insertMany(data);
    res.status(201).send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

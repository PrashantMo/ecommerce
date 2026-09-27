const databaseConnection = (mongoClient) => {
  let connectionPromise;

  return async (req, res, next) => {
    try {
      if (!connectionPromise) {
        connectionPromise = mongoClient.connect();
        await connectionPromise;
        console.log('Connected to MongoDB');
      } else {
        await connectionPromise;
      }

      next();
    } catch (error) {
      connectionPromise = undefined;
      console.error('Unable to connect to MongoDB:', error.message);
      res.status(500).send('Database connection failed');
    }
  };
};

module.exports = { databaseConnection };
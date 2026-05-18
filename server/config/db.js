const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI || 'mongodb://localhost:27017/linkvault';

    try {
      // First attempt to connect to a real database (fails silently if not found)
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 1000 });
      console.log(`\n✅ Server is running on port ${process.env.PORT || 5000}`);
      console.log(`✅ Database successfully connected to: ${conn.connection.host}\n`);
      return;
    } catch (e) {
      // If no local database is running, silently fallback to memory database
      const mongoServer = await MongoMemoryServer.create();
      const memUri = mongoServer.getUri();
      const conn = await mongoose.connect(memUri);
      console.log(`\n✅ Server is running on port ${process.env.PORT || 5000}`);
      console.log(`✅ Database successfully connected (In-Memory Mode)\n`);
    }
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

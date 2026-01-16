import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url);
    this.db = null;
    this.status = false;

    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        this.status = true;
        console.log('MongoDB connected');
      })
      .catch((error) => {
        this.status = false;
        console.error('MongoDB connection error:', error.message);
      });
  }

  isAlive() {
    return this.status;
  }

  async nbUsers() {
    if (!this.db) return 0;
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.db) return 0;
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;

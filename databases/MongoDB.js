import mongoose from 'mongoose';

class MongoDB {
  async connect() {
    try {
      let host = process.env.DB_HOST || '127.0.0.1';
      let port = process.env.DB_PORT || 27017;
      let name = process.env.DB_NAME || 'admin';
      let connectString = `mongodb://${host}:${port}/${name}`;
  
      await mongoose.connect(connectString, { useNewUrlParser: true });
      console.log('Connect to MongoDB successfully!');
    } catch (error) {
      console.log('Connect to MongoDB failure!!!');
    }
  }
}

export default new MongoDB;

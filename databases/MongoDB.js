import mongoose from 'mongoose';

class MongoDB {
  async connect() {
    try {
      let host = process.env.DB_HOST;
      let port = process.env.DB_PORT;
      let name = process.env.DB_NAME;
      let connectString = `mongodb://${host}:${port}/${name}`;
      let mongodbOptions= {
        useNewUrlParser: true,
        useUnifiedTopology: true
      };
  
      await mongoose.connect(connectString, mongodbOptions);
      console.log('Connect to MongoDB successfully!');
    } catch (error) {
      console.log('Connect to MongoDB failure!!!');
    }
  }
}

export default new MongoDB;

import mongoose from 'mongoose';

class MongoDB {
  async connect() {
    try {
      let connectString = `mongodb://127.0.0.1:27017/photobook`;
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

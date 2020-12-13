import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let albumSchema = new Schema({
  photos: [{
    type: ObjectId,
    ref: 'Photo'
  }],
  title: String,
  description: String,
  mode: String,
  user: {
    type: ObjectId,
    ref: 'USer'
  },
  like: Number,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
});

export default mongoose.model('Album', albumSchema);

import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let photoSchema = new Schema({
  photoUrl: String,
  title: String,
  description: String,
  mode: String,
  user: {
    type: ObjectId,
    ref: 'User'
  },
  likeCount: Number,
  createddAt: Date,
  updatedAt: Date,
  deletedAt: Date
});

export default mongoose.model('Photo', photoSchema);

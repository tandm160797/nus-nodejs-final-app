import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

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
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: Date
});

photoSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt : true
});

photoSchema.pre('save', async function() {
  // Handler updatedAt filed
  if (this.createdAt) {
    this.updatedAt = new Date
  }
});

export default mongoose.model('Photo', photoSchema);

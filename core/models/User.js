import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let userSchema = new Schema({
  avatar: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  followings: [{
    type: ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: ObjectId,
    ref: 'User'
  }],
  status: String,
  isAdmin: Boolean,
  createddAt: Date,
  updatedAt: Date,
  deletedAt: Date
});

userSchema.methods.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
}

export default mongoose.model('User', userSchema);

import bcrypt from 'bcryptjs';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let userSchema = new Schema({
  avatarUrl: String,
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

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

userSchema.pre('save', function() {
  this.password = bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema);

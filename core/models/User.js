import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';


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
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: Date
});

userSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt : true
});

userSchema.methods.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
}

userSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);

  // Handler updatedAt filed
  if (this.createdAt) {
    this.updatedAt = new Date
  }
});

export default mongoose.model('User', userSchema);

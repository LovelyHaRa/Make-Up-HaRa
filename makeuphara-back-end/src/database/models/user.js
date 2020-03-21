import mongoose, { Schema } from 'mongoose';

mongoose.set('useCreateIndex', true);
const UserSchema = new Schema({
  username: { type: String },
  name: { type: String, index: 'hashed' },
  hashedPassword: String,
  createdAt: { type: Date, index: { unique: false }, default: Date.now },
  updateAt: { type: Date, index: { unique: false }, default: Date.now },
  provider: String,
  authToken: String,
  google: {},
});

const User = mongoose.model('User', UserSchema);
export default User;

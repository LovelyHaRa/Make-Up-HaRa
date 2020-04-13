import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

UserSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.serialize = function() {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function() {
  const token = jwt.sign(
    { _id: this.id, username: this.username, provider: this.provider },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
  return token;
};

UserSchema.statics.findByUsername = function(username) {
  return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;

require('dotenv').config();
import mongoose from 'mongoose';

export const initDatabase = () => {
  connect();
};

const connect = () => {
  const { MONGODB_URI } = process.env;
  mongoose.Promise = global.Promise;
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((exception) => {
      console.error(exception);
    });
};

import mongoose, { Schema } from 'mongoose';

mongoose.set('useCreateIndex', true);

const TitleSchema = new Schema({
  code: { type: String, index: { unique: true } },
  name: { type: String, index: { unique: true } },
  lately: { type: Number },
});

const DocumentSchema = new Schema({
  title: TitleSchema,
  body: { type: String },
  publisher: { _id: mongoose.Types.ObjectId, username: { type: String } },
  revision: { type: Number },
});

TitleSchema.statics.findByCode = function(code) {
  return this.findOne({ code });
};

TitleSchema.statics.findByName = function(name) {
  return this.findOne({ name });
};

const Document = mongoose.model('Document', DocumentSchema);
export const Title = mongoose.model('Title', TitleSchema);

export default Document;

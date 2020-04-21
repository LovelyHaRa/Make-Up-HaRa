import mongoose, { Schema } from 'mongoose';

mongoose.set('useCreateIndex', true);

const WikiTitleSchema = new Schema({
  code: { type: [String] },
  name: { type: String, index: { unique: true } },
  lately: { type: Number },
});

const DocumentSchema = new Schema({
  title: WikiTitleSchema,
  body: { type: String },
  publisher: { _id: mongoose.Types.ObjectId, username: { type: String } },
  revision: { type: Number },
});

WikiTitleSchema.statics.findByCode = function(code) {
  return this.findOne({ code });
};

WikiTitleSchema.statics.findByName = function(name) {
  return this.findOne({ name });
};

const Document = mongoose.model('Document', DocumentSchema);
export const WikiTitle = mongoose.model('Title', WikiTitleSchema);

export default Document;

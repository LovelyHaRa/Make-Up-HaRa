import mongoose, { Schema } from 'mongoose';

mongoose.set('useCreateIndex', true);

const WikiTitleSchema = new Schema({
  code: { type: [String] },
  name: { type: String, index: { unique: true } },
  lately: { type: Number },
  updateDate: { type: Date },
  documentLength: { type: Number },
});

WikiTitleSchema.statics.findByCode = function (code) {
  return this.findOne({ code });
};

WikiTitleSchema.statics.findByName = function (name) {
  return this.findOne({ name });
};
export const WikiTitle = mongoose.model('Title', WikiTitleSchema);

const DocumentSchema = new Schema({
  title: { type: Schema.Types.ObjectId, ref: 'Title' },
  body: { type: String },
  publisher: { _id: mongoose.Types.ObjectId, username: { type: String } },
  publishedDate: { type: Date, default: Date.now },
  revision: { type: Number },
});

const Document = mongoose.model('Document', DocumentSchema);

export default Document;

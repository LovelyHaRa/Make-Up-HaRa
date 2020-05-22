import mongoose, { Schema } from 'mongoose';

mongoose.set('useCreateIndex', true);

const CommentSchema = new Schema({
  body: { type: String },
  commenter: {
    _id: mongoose.Types.ObjectId,
    username: { type: String },
    name: { type: String },
  },
  commentDate: { type: Date, default: Date.now },
});

const PostSchema = new Schema({
  title: { type: String },
  body: { type: String },
  tags: { type: [String] },
  publishedDate: { type: Date, default: Date.now },
  publisher: {
    _id: mongoose.Types.ObjectId,
    username: { type: String },
    name: { type: String },
  },
  comment: [CommentSchema],
});

const Post = mongoose.model('Post', PostSchema);
export const Comment = mongoose.model('Comment', CommentSchema);

export default Post;

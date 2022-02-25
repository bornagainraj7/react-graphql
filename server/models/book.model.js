const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  _id: { type: String, default: uuid.v4 },
  name: { type: String, required: true },
  genre: { type: String, required: true },
  authorId: { type: String, ref: 'author' },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number },
});

// bookSchema.pre('save', () => {
//   this.createdAt = Date.now();
//   this.updatedAt = Date.now();
//   return next();
// });

// bookSchema.pre('findOneAndUpdate', (next) => {
//   this.updatedAt = Date.now();
//   return next();
// });

// bookSchema.pre('findByIdAndUpdate', (next) => {
//   this.updatedAt = Date.now();
//   return next();
// });

// bookSchema.pre('updateOne', (next) => {
//   this.updatedAt = Date.now();
//   return next();
// });

module.exports = mongoose.model('Book', bookSchema);

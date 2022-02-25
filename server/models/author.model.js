const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  _id: { type: String, default: uuid.v4 },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number },
});

// authorSchema.pre('save', () => {
//   this.createdAt = Date.now();
//   this.updatedAt = Date.now();
//   return next();
// });

// authorSchema.pre('findOneAndUpdate', (next) => {
//   this.updatedAt = Date.now();
//   return next();
// });

// authorSchema.pre('findByIdAndUpdate', (next) => {
//   this.updatedAt = Date.now();
//   return next();
// });

// authorSchema.pre('updateOne', (next) => {
//   this.updatedAt = Date.now();
//   return next();
// });

module.exports = mongoose.model('Author', authorSchema);

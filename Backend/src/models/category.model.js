const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

categorySchema.statics.nameExists = async function (name, excludeCategoryId) {
  const category = await this.findOne({ name, _id: { $ne: excludeCategoryId } });
  return !!category;
};

categorySchema.statics.codeExists = async function (code, excludeCategoryId) {
  const category = await this.findOne({ code, _id: { $ne: excludeCategoryId } });
  return !!category;
};

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;

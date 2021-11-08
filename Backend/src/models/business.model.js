const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const businessSchema = mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    businessAccount: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
    },
    businessCertificate: {
      type: String,
      required: false,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: false,
      trim: true,
    },
    headquarter: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Branch',
      required: false,
    },
  },
  { timestamps: true }
);

businessSchema.plugin(toJSON);
businessSchema.plugin(paginate);

businessSchema.statics.nameExists = async function (businessName, excludeBusinessId) {
  const business = await this.findOne({ businessName, _id: { $ne: excludeBusinessId } });
  return !!business;
};

businessSchema.statics.displayNameExists = async function (displayName, excludeBusinessId) {
  const business = await this.findOne({ displayName, _id: { $ne: excludeBusinessId } });
  return !!business;
};

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;

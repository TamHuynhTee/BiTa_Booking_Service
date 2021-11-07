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
      default: true,
    },
    businessAccount: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    businessCertificate: {
      type: String,
      required: true,
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

businessSchema.statics.nameExists = async function (businessName, excludeUserId) {
  const business = await this.findOne({ businessName, _id: { $ne: excludeUserId } });
  return !!business;
};

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;

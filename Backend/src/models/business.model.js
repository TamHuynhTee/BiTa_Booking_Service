const mongoose = require('mongoose');

const businessSchema = mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      required: true,
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
    businessAccount: _id,
    businessCertificate: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;

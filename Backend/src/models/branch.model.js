const mongoose = require('mongoose');

const branchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    business: {
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    map: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    state: {
      type: String,
      enum: ['WORKING', 'PAUSE'],
      default: 'WORKING',
    },
  },
  { timestamps: true }
);

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;

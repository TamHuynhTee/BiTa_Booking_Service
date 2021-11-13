const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const branchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    business: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Business',
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    coordinates: {
      type: [Number],
      required: false,
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
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
  },
  { timestamps: true }
);

branchSchema.plugin(toJSON);
branchSchema.plugin(paginate);

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;

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

branchSchema.statics.nameExists = async function (name, excludeBranchId) {
  const branch = await this.findOne({ name, _id: { $ne: excludeBranchId } });
  return !!branch;
};

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;

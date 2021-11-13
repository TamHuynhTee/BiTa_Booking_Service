const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const serviceSchema = mongoose.Schema(
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
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
    hasDeposit: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    depositPrice: {
      type: Number,
      required: false,
      default: 0,
    },

    state: {
      type: String,
      required: true,
      enum: ['Working', 'Shut'],
      default: 'Working'
    },
  },
  { timestamps: true }
);

serviceSchema.plugin(toJSON);
serviceSchema.plugin(paginate);

serviceSchema.statics.nameExists = async function (name, excludeServiceId) {
  const service = await this.findOne({name, _id: { $ne: excludeServiceId } });
  return !!service;
};

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;

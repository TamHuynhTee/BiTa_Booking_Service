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
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    hasDeposit: {
      type: Boolean,
      default: false,
    },
    depositPrice: {
      type: Number,
      required: false,
      default: 0,
    },
    schedule: [
      {
        weekDay: {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        time: [String],
      },
    ],
    duration: {
      quantity: {
        type: Number,
        required: false,
        default: 0,
      },
      unit: {
        type: String,
        enum: ['minute', 'hour'],
        default: 'minute',
      },
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

serviceSchema.plugin(toJSON);
serviceSchema.plugin(paginate);

serviceSchema.statics.nameExists = async function (name, excludeServiceId) {
  const service = await this.findOne({ name, _id: { $ne: excludeServiceId } });
  return !!service;
};

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;

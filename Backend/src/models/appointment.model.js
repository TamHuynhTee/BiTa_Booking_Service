const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const appointmentSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    customerName: { type: String, required: false, trim: true },
    customerPhoneNumber: { type: String, required: false, trim: true },
    business: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Business',
      required: true,
    },
    service: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Service',
      required: true,
    },
    branch: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Branch',
      required: true,
    },
    hasDeposit: {
      type: Boolean,
      required: true,
    },
    payment: {
      type: String,
      enum: ['NotPaid', 'PartialPaid', 'FullyPaid'],
      default: 'NotPaid',
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    notify: {
      type: String,
      required: true,
      enum: ['AsScheduled', 'MaybeSoon', 'MaybeLate'],
      default: 'AsScheduled',
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
      enum: ['Pending', 'Done', 'Canceled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

appointmentSchema.plugin(toJSON);
appointmentSchema.plugin(paginate);

appointmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'service',
    select: 'name',
  });
  this.populate({
    path: 'branch',
    select: 'name address',
  });
  this.populate({
    path: 'business',
    select: 'displayName',
  });
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;

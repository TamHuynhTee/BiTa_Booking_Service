const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const reviewSchema = mongoose.Schema(
  {
    service: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Service',
      required: true,
    },
    appointment: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Appointment',
      required: true,
    },
    customer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    comment: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      enum: ['Pending', 'Reviewed'],
      default: 'Pending',
    },
    reviewedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'service',
    select: 'name business -category',
  });
  this.populate({
    path: 'customer',
    select: 'avatar username',
  });
  this.populate({
    path: 'appointment',
    select: 'customerName customerPhoneNumber price startTime endTime -business -service -branch',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

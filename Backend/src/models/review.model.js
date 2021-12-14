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

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

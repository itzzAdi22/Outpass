const mongoose = require('mongoose');

const outPassSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Please provide the date for out-pass']
  },
  time: {
    type: String,
    required: [true, 'Please provide the time for out-pass']
  },
  reason: {
    type: String,
    required: [true, 'Please provide the reason for out-pass'],
    trim: true,
    maxlength: [200, 'Reason cannot exceed 200 characters']
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

outPassSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'userId',
    select: 'name email'
  });
  next();
});

module.exports = mongoose.model('OutPass', outPassSchema);

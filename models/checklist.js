const mongoose = require('mongoose')
const ChecklistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    schedule_type: {
      type: String,
      enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
    },
    inspection_day: { type: String },
    inspection_time: { type: String },
    inspection_date: { type: String },
    inspection_month: { type: String },
    is_completed: { type: Boolean, default: false },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Checklist', ChecklistSchema)

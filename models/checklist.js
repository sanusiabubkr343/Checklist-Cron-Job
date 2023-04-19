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
    cron_expression: {
      type: String,
      required: true,
    },

    is_active: { type: Boolean, default: false },
    has_report_completed: { type: Boolean, default: false },
  },
  { timestamps: true },
  { toJSON: { getters: true } },
)

module.exports = mongoose.model('Checklist', ChecklistSchema)

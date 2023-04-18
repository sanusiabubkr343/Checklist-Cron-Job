const express = require('express')
require('express-async-errors')
const asyncHandler = require('express-async-handler')
const Checklist = require('../models/checklist')
const DATA = require('../utils /enums')
const moment = require('moment')

exports.createCheckList = asyncHandler(async (req, res, next) => {
  const {
    name,
    schedule_type,
    inspection_day,
    inspection_time,
    inspection_date,
    inspection_month,
  } = req.body

  function getCronExpression() {
    var minute = inspection_time.split(':')[0] // by the begining of the day 00:00 for both minutes and time
    var hour = inspection_time.split(':')[1]
    var dayOfMonth = inspection_date
    var raw_month = String(inspection_month.toUpperCase().slice(0, 3)) //JAN, FEB OR MARCH
    var month = DATA.MONTH_DICT[raw_month] //convert it to numbers [1-12]
    var raw_dayOfWeek = String(inspection_day.toUpperCase().slice(0, 3)) // This will give you this format (SUN or MON)
    var dayOfWeek = DATA.DAY_DICT[raw_dayOfWeek] // convert it to number [0-6]

    if (!minute) {
      minute = '0'
    }
    if (!hour) {
      hour = '0'
    }
    if (!dayOfMonth) {
      dayOfMonth = '*'
    }
    if (!month) {
      month = '*'
    }

    if (!dayOfWeek) {
      dayOfWeek = '1-5' //monday - Friday
    }

    var schedule_detail = ` ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} `
    return schedule_detail
  }

  const newObj = new Checklist({
    name: name,
    schedule_type: schedule_type,
    inspection_day: inspection_day,
    inspection_time: inspection_time, //24hr
    inspection_date: inspection_date,
    inspection_month: inspection_month,
    cron_expression: getCronExpression(),
    cron_without_time_expression:cron_expression.slice(,)
  })

  const result = await newObj.save()

  res.status(201).json({
    success: true,
    data: result,
  })
})

exports.getAllChecklist = asyncHandler(async (req, res, next) => {
  result = await Checklist.find().select('-__v').sort('-updatedAt _id').exec()
  return res
    .status(200)
    .json({ success: 'true', count: result.length, data: result })
})

exports.getUpcomingAllChecklist = asyncHandler(async (req, res, next) => {
  result = await Checklist.find({ is_completed: false })
    .select('-__v')
    .sort('-updatedAt _id')
    .exec()
  return res
    .status(200)
    .json({ success: 'true', count: result.length, data: result })
})

exports.getAllCompletedChecklist = asyncHandler(async (req, res, next) => {
  result = await Checklist.find({ is_completed: true })
    .select('-__v')
    .sort('-updatedAt _id')
    .exec()
  return res
    .status(200)
    .json({ success: 'true', count: result.length, data: result })
})

exports.updateChecklist = asyncHandler(async (req, res, next) => {
  _id = req.params.id
  filter = { _id: _id }
  new_update = req.body
  result = await Checklist.findOneAndUpdate(filter, new_update, {
    new: true,
  }).exec()

  if (!result) {
    return res.status(404).json({ success: false, message: 'Not found !' })
  }
  return res.status(201).json({ success: 'true', data: result })
})
exports.getAllCronJob = asyncHandler(async (req, res, next) => {
  /*To check if a certain cron expression falls within the current day or date (but not necessarily the time one  can modify the format string used with the moment() function. Instead of including the minutes and hours fields, you can set them to fixed values of "0" to ignore the time portion of the cron expression. ),
  */
  // const currentDate = moment().format('0 0 D M d')
  const currentDate  = ' 11 10 25 12 1-5 '
  const result  = await Checklist.find({ cron_expression: currentDate }).select('-__v').sort('-updatedAt _id').exec()
  return res.status(201).json({ success: 'true',data: result  })

})

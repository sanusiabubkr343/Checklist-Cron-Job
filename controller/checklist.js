const express = require('express')
require('express-async-errors')
const asyncHandler = require('express-async-handler')
const Checklist = require('../models/checklist')


exports.createCheckList = asyncHandler(async (req, res, next) => {
  const { name, schedule_type, inspection_day, inspection_time, inspection_date, inspection_month } = req.body
  
  const newObj = new Checklist({
    name: name,
    schedule_type: schedule_type,
    inspection_day: inspection_day,
    inspection_time: inspection_time, //24hr
    inspection_date: inspection_date,
    inspection_month:inspection_month
    
  })

  const result = await newObj.save()

  res.status(201).json({
    success: true,
    data: result  ,
  })
})

exports.getAllChecklist = asyncHandler(async (req, res, next) => {


  result = await Checklist.find().select('-__v').sort('-updatedAt _id').exec()
  return res
    .status(200)
    .json({ success: 'true', count:result.length, data:result })
})

exports.getUpcomingAllChecklist = asyncHandler(async (req, res, next) => {
   result = await Checklist.find({is_completed:false}).select('-__v').sort('-updatedAt _id').exec()
  return res
    .status(200)
    .json({ success: 'true', count:result.length, data:result })
})

exports.getAllCompletedChecklist = asyncHandler(async (req, res, next) => {
 result = await Checklist.find({is_completed:true}).select('-__v').sort('-updatedAt _id').exec()
  return res
    .status(200)
    .json({ success: 'true', count:result.length, data:result })
})

exports.updateChecklist = asyncHandler(async (req, res, next) => {

  _id = req.params.id
  filter = { _id: _id, }
  new_update = req.body
  result = await Checklist.findOneAndUpdate(filter, new_update, {
    new: true,
  }).exec()

  if (!result) {
    return res.status(404).json({ success: false, message: 'Not found !' })
  }
  return res.status(201).json({ success: 'true', data: result })
})

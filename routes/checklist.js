const express = require('express')
require('express-async-errors')
const router = express.Router()
const {getAllChecklist,createCheckList,getAllCompletedChecklist,getUpcomingAllChecklist,updateChecklist,getAllDailyChecklist} = require('../controller/checklist')

router.post('/create', createCheckList)
router.patch('/update/:id',updateChecklist)
router.get('/list', getAllChecklist)
router.get('/get-all-daily-crons-checklist', getAllDailyChecklist)
router.get('/list/upcoming', getUpcomingAllChecklist)
router.get('/list/completed', getAllCompletedChecklist)




module.exports =router

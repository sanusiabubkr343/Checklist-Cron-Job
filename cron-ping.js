const dotenv = require('dotenv')
dotenv.config()
const Checklist = require('./models/checklist')
var cron = require('node-cron');
const mongoose = require('mongoose')

//connection of mongodb
mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Cron Job instance connected to db')
  })
  .catch((err) => {
    console.log('Cron Job instance couldnt connect to db', err)
  })


// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31, L)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, optional)



scheduleDailyUpdate = async () => {
    minute = 1
      hour ='*'
    dayOfMonth ='*'
    month ='*'
  dayOfWeek = '*'
  schedule_detail = ` ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} `
 
  //get all IDs whose schedule_type is daily and fetch all inspection time
  try {
    const inspection_time_list = []
    const quesrySet = await Checklist.find({ schedule_type: 'Daily' }).select('-__v').sort('-updatedAt _id').exec()

    quesrySet.map((Obj) => {
      inspection_time_list.push(Obj.inspection_time)

    })
   
   
    console.log(inspection_time_list)
   
   }  
  catch (err) {
    console.log('Error:' +err.message)
  }
    
    
  cron.schedule(schedule_detail, async () => {
  
    try {
    // result = await Checklist.findOneAndUpdate({ _id: '64329b7fee203c141b9ac815' }, { is_completed: true }, { new: true })
    // console.log("Done Updating : "+ result._id)
    console.log('pass')

  }
  catch (err) {
    console.log('Error:' +err.message)
  }
  })
  
}

scheduleDailyUpdate()

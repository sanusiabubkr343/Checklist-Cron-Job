const dotenv = require('dotenv')
dotenv.config()
const Checklist = require('./models/checklist')

const mongoose = require('mongoose')
const { schedule } = require('agenda/dist/agenda/schedule')


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

// Define function to check if the current date or day of week match the cron expression








// scheduleDailyUpdate = async () => {
//   //get all IDs whose schedule_type is daily and fetch all inspection time
//   try {
//     const id_and_time_list = []
//     const quesrySet = await Checklist.find({ schedule_type: 'Daily' })
//       .select('-__v')
//       .sort('-updatedAt _id')
//       .exec()

//     quesrySet.map((Obj) => {
//       id_and_time_list.push({
//         _id: Obj._id,
//         inspection_time: Obj.inspection_time,
//       })
//     })

//     id_and_time_list.map((Obj) => {
//       var _id = Obj._id
//       var time_val = Obj.inspection_time
//       var minute = time_val.split(':')[1]
//       var hour = time_val.split(':')[0]
//       var dayOfMonth = '*'
//       var month = '*'
//       var dayOfWeek = '1-5' //monday - Friday
//       var schedule_detail = ` ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} `

//       // console.log("for id:" +_id +",has  hour :" + hour + "," + "minutes:" + minute
//       // )

//       cron.schedule(schedule_detail, async () => {
//         try {
//           result = await Checklist.findOneAndUpdate(
//             { _id: _id },
//             { is_completed: false },
//             { new: true },
//           )
//           console.log('---------------------');
//           console.log('Done Updating Job')
//         } catch (err) {
//           console.log('Error:' + err.message)
//         }
//       })
//     })
//   } catch (err) {
//     console.log('Error:' + err.message)
//   }
// }

// scheduleWeeklyUpdate = async () => {
//   //get all IDs whose schedule_type is daily and fetch all inspection time
//   try {
//     const id_and_time_list = []
//     const quesrySet = await Checklist.find({ schedule_type: 'Weekly' })
//       .select('-__v')
//       .sort('-updatedAt _id')
//       .exec()

//     quesrySet.map((Obj) => {
//       id_and_time_list.push({
//         _id: Obj._id,
//         inspection_day:Obj.inspection_day,
//         inspection_time: Obj.inspection_time,

//       })
//     })

//     id_and_time_list.map((Obj) => {
//       var _id = Obj._id
//       var time_val = Obj.inspection_time
//       var minute = time_val.split(':')[1]
//       var hour = time_val.split(':')[0]
//       var dayOfMonth = '*'
//       var month = '*'
//       var dayOfWeek = (Obj.inspection_day).toUpperCase().slice(0,3) // This will give you this format (SUN or MON)
//       var schedule_detail = ` ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} `

//       // console.log("for id:" +_id +",has  hour :" + hour + "," + "minutes:" + minute
//       // )

//       cron.schedule(schedule_detail, async () => {
//         try {
//           result = await Checklist.findOneAndUpdate(
//             { _id: _id },
//             { is_completed: false },
//             { new: true },
//           )
//           console.log('---------------------');
//           console.log('Done Updating Job')
//         } catch (err) {
//           console.log('Error:' + err.message)
//         }
//       })
//     })
//   } catch (err) {
//     console.log('Error:' + err.message)
//   }
// }
// scheduleMonthlyUpdate = async () => {
//   //get all IDs whose schedule_type is daily and fetch all inspection time
//   try {
//     const id_and_time_list = []
//     const quesrySet = await Checklist.find({ schedule_type: 'Monthly' })
//       .select('-__v')
//       .sort('-updatedAt _id')
//       .exec()

//     quesrySet.map((Obj) => {
//       id_and_time_list.push({
//         _id: Obj._id,
//         inspection_dayOfMonth:Obj.inspection_date,
//         inspection_time: Obj.inspection_time,

//       })
//     })

//     id_and_time_list.map((Obj) => {
//       var _id = Obj._id
//       var time_val = Obj.inspection_time
//       var minute = time_val.split(':')[1]
//       var hour = time_val.split(':')[0]
//       var dayOfMonth = Obj.inspection_dayOfMonth
//       var month = (Obj.inspection_month.toUpperCase()).slice(0,3) //get JAN
//       var dayOfWeek = '*'
//       var schedule_detail = ` ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} `

//       // console.log("for id:" +_id +",has  hour :" + hour + "," + "minutes:" + minute
//       // )

//       cron.schedule(schedule_detail, async () => {
//         try {
//           result = await Checklist.findOneAndUpdate(
//             { _id: _id },
//             { is_completed: true },
//             { new: true },
//           )
//           console.log('---------------------');
//           console.log('Done Updating Job')
//         } catch (err) {
//           console.log('Error:' + err.message)
//         }
//       })
//     })
//   } catch (err) {
//     console.log('Error:' + err.message)
//   }
// }
// scheduleYearlyUpdate = async () => {
//   //get all IDs whose schedule_type is daily and fetch all inspection time
//   try {
//     const id_and_time_list = []
//     const quesrySet = await Checklist.find({ schedule_type: 'Yearly' })
//       .select('-__v')
//       .sort('-updatedAt _id')
//       .exec()

//     quesrySet.map((Obj) => {
//       id_and_time_list.push({
//         _id: Obj._id,
//         inspection_dayOfMonth:Obj.inspection_date,
//         inspection_time: Obj.inspection_time,
//         inspection_month : Obj.inspection_month,


//       })
//     })

//     id_and_time_list.map((Obj) => {
//       var _id = Obj._id
//       var time_val = Obj.inspection_time
//       var minute = time_val.split(':')[1]
//       var hour = time_val.split(':')[0]
//       var dayOfMonth = Obj.inspection_dayOfMonth
//       var month = '*'
//       var dayOfWeek = '*'
//       var schedule_detail = ` ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} `

//       // console.log("for id:" +_id +",has  hour :" + hour + "," + "minutes:" + minute
//       // )

//       cron.schedule(schedule_detail, async () => {
//         try {
//           result = await Checklist.findOneAndUpdate(
//             { _id: _id },
//             { is_completed: false },
//             { new: true },
//           )
//           console.log('---------------------');
//           console.log('Done Updating Job')
//         } catch (err) {
//           console.log('Error:' + err.message)
//         }
//       })
//     })
//   } catch (err) {
//     console.log('Error:' + err.message)
//   }
// }


// const task = () => {
//   scheduleDailyUpdate()
//   scheduleWeeklyUpdate()
//   scheduleMonthlyUpdate()
//   scheduleYearlyUpdate()

// }




// module.exports = task

const mongoose = require('mongoose');
const cron = require('cron');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Checklist schema
const ChecklistSchema = new mongoose.Schema({
  inspection_day: Number,
  inspection_time: String,
  inspection_date: Number,
  is_active: Boolean,
  inspection_month: Number,
  cron_expression: String,
});

// Define the Checklist model
const Checklist = mongoose.model('Checklist', ChecklistSchema);

// Define function to check if the current date or day of week match the cron expression
function checkCronExpression(cronExpression) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const date = now.getDate();
  const job = new cron.CronJob(cronExpression, () => {
    console.log(`The current date or day of week match the cron expression ${cronExpression}`);
    job.stop();

    // Update is_active field in database
    Checklist.updateOne({ cron_expression: cronExpression }, { is_active: true }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Updated ${result.nModified} documents`);
      }
    });
  });

  // Check if the current day or date match the cron expression every day at 12:59 PM
  if (dayOfWeek === parseInt(cronExpression.split(' ')[4]) || date === parseInt(cronExpression.split(' ')[2])) {
    job.start();
  }
}

// Check cron expressions every day at 12:59 PM
const job = new cron.CronJob('59 12 * * *', () => {
  console.log('Checking cron expressions...');
  Checklist.find({}, (err, checklists) => {
    if (err) {
      console.log(err);
    } else {
      // Check if each checklist's cron expression matches the current day or date
      checklists.forEach((checklist) => {
        checkCronExpression(checklist.cron_expression);
      });
    }
  });
});
job.start();

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31, L)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, optional)

exports.MONTH_DICT = {
  "JAN": 1,
  "FEB": 2,
  "MAR": 3,
  "APR": 4,
  "MAY": 5,
  "JUN": 6,
  "JUL": 7,
  "AUG": 8,
  "SEP": 9,
  "OCT": 10,
  "NOV": 11,
  "DEC": 12
};

exports.DAY_DICT = {
  "SUN": 0,
  "MON": 1,
  "TUE": 2,
  "WED": 3,
  "THU": 4,
  "FRI": 5,
  "SAT": 6
};

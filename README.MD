<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
  <h1>Checklist Cron Job</h1>
  <p>This repository contains a Node.js application that updates a database daily, weekly, monthly, and yearly using a cron job.</p>
  
  <h2>Requirements</h2>
  <ul>
    <li>Node.js (version 12 or higher)</li>
    <li>NPM (version 6 or higher)</li>
    <li>MongoDB (version 4 or higher)</li>
  </ul>
  
  <h2>Installation</h2>
  <ol>
    <li>Clone this repository: <code>git clone https://github.com/sanusiabubkr343/Checklist-Cron-Job.git</code></li>
    <li>Install dependencies: <code>npm install</code></li>
    <li>Configure environment variables: Create a <code>.env</code> file in the root directory of the project, and set the following variables:<br>
      <code>MONGODB_URI=&lt;your MongoDB connection string&gt;</code></li>
    <li>Run the application: <code>npm start</code></li>
  </ol>
  
  <h2>Usage</h2>
  <p>The application uses a cron job to update the database on a regular schedule. The cron job is defined in the <code>app.js</code> file using the node-cron library.</p>
  
  <p>The cron job is configured to run at the following intervals:</p>
  
  <ul>
    <li>Daily at 12:00 AM (midnight) UTC</li>
    <li>Weekly on Monday at 1:00 AM UTC</li>
    <li>Monthly on the first day of the month at 2:00 AM UTC</li>
    <li>Yearly on January 1st at 3:00 AM UTC</li>
  </ul>
  
  <p>The schedule details for the cron job are defined using the cron function from the node-cron library. The format for the schedule details is "<code>* * * * *</code>" where each <code>*</code> represents a field for the minute, hour, day of the month, month, and day of the week respectively.</p>
  
  <p>Here is an example of how to define the schedule details using variables in JavaScript:</p>
  
  <pre><code>const minute = "0";
const hour = "2";
const dayOfMonth = "1";
const month = "*";
const dayOfWeek = "*";
const schedule_detail = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

cron(schedule_detail, job_function);
</code></pre>
  
  <p>In this example, the <code>schedule_detail</code> variable is set to run on the first day of the month at 2:00 AM. You can adjust the values of these variables to configure the schedule to run at different times.</p>
  
  <h2>License</h2>
  <p>This project is licensed under the MIT License. See the LICENSE file for details.</p>
  
  <p

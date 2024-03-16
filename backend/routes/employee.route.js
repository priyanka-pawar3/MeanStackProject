const express = require('express');
const app = express();
const employeeRoute = express.Router();
// Employee model
let Employee = require('../models/Employee');

// Add Employee
employeeRoute.route('/create').post((req, res, next) => {
  Employee.create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// Get All Employees
employeeRoute.route('/').get((req, res) => {
  // Employee.find((error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.json(data)
  //   }
  // })
   Employee.find()
  .then((result) => {
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  })
  .catch((err) => {
    return next(err);
  });
})

// Get single employee
employeeRoute.route('/read/:id').get((req, res) => {
  Employee.findById(req.params.id, req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully retrieved.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
})

// Update employee
employeeRoute.route('/update/:id').put((req, res, next) => {
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((result) => {
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
     // return next(err);
    });
})

// Delete employee
employeeRoute.route('/delete/:id').delete((req, res, next) => {
  Employee.findByIdAndDelete(req.params.id)
  .then(() => {
    res.json({
      msg: "Data successfully updated.",
    });
  })
  .catch((err) => {
    console.log(err);
   // return next(err);
  });
})
module.exports = employeeRoute;
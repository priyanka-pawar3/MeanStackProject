const express = require('express');
const app = express();
const employeeRoute = express.Router();
// Employee model
let Employee = require('../models/Employee');
const bcrypt = require('bcrypt')

// Employee Register
employeeRoute.route('/create').post((req, res, next) => {
  Employee.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        bcrypt.hash(req.body.password, 10).then(hash => {
          req.body.password = hash

          Employee.create(req.body)
            .then((result) => {
              res.json({
                data: result,
                message: "Employee registered successfully",
                status: 200,
              });
            })
            .catch((err) => {
              return next(err);
            });
        });
      } else {
        res.status(404).send("Email is already exist");
      }
    })
    .catch((err) => {
      return next(err);
    });

});

// Login Employee
employeeRoute.route('/login').post((req, res, next) => {
  const obj = req.body
  const conditions = { email: obj.email }

  Employee.findOne(conditions)
    .then((result) => {

      if (result && bcrypt.compareSync(req.body.password, result.password)) {
        return res.json({
          data: result,
          message: "Employee Login successfully",
          status: 200,
        });
      } else {
        res.status(404).send("Invalid login credentials");
      }
    })

    .catch((err) => {
      return next(err);
    });
});

// Get All Employees
employeeRoute.route('/').get((req, res) => {
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
        msg: "Employee updated successfully",
      });
    })
    .catch((err) => {
      return next(err);
    });
})

// Delete employee
employeeRoute.route('/delete/:id').delete((req, res, next) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({
        msg: "Employee deleted successfully",
      });
    })
    .catch((err) => {
      return next(err);
    });
})
module.exports = employeeRoute;
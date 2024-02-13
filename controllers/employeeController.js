const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//* POST => Register employee
exports.registerEmployee = async (req, res) => {
  const { fullname, phone_number, password } = req.body;

  // Validate phone number format
  const phoneNumberRegEx = /^(\+998)-\d{2}-\d{3}-\d{2}-\d{2}$/;

  let errorMessage = "";

  if (!phone_number || !password) {
    errorMessage = "Please provide phone number and password";
  } else if (!phoneNumberRegEx.test(phone_number)) {
    errorMessage = "Invalid phone number format";
  } else if (password.length < 8) {
    errorMessage = "Password must be at least 8 characters long";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  }

  try {
    const foundUser = await Employee.find({ phone_number }).exec();
    if (foundUser.length > 0) {
      return res.status(400).send({
        error: "This employee has already registered!",
      });
    }

    if (req.employerId || req.body.employerId) {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Creating new employee
      const employee = new Employee({
        fullname,
        phone_number,
        employer_id: req.employerId || req.body.employerId,
        password: hashedPassword,
      });

      await employee.save();

      return res.status(201).send({
        message: "Employee created successfully",
        employee,
      });
    } else {
      return res.status(400).send({
        error: "Employer's id is required",
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while creating the employee",
      description: error,
    });
  }
};

//* POST => Login employee
exports.loginEmployee = async (req, res) => {
  const { phone_number, password } = req.body;

  const phoneNumberRegEx = /^(\+998)-\d{2}-\d{3}-\d{2}-\d{2}$/;

  let errorMessage = "";
  if (!phone_number || !password) {
    errorMessage = "Phone number and Password are required";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  } else if (!phoneNumberRegEx.test(phone_number)) {
    return res.status(400).send({
      error: "Invalid phone number",
    });
  }

  try {
    const foundUser = await Employee.find({ phone_number }).exec();
    if (foundUser.length > 0) {
      bcrypt.compare(password, foundUser[0].password, (err, decoded) => {
        if (!decoded) {
          return res.status(400).send({
            error: "Invalid Password",
          });
        }
        const token = jwt.sign(
          {
            phone_number,
            role: "employee",
          },
          process.env.jwt_secret_key
        );

        return res.status(200).send({
          message: "Employee successfully logged in",
          token,
        });
      });
    } else {
      return res.status(400).send({
        error: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).send({
      err,
    });
  }
};

//* GET => Get all employees
exports.getAllEmployees = async (req, res) => {
  const employerId = req.employerId || req.headers.employer_id;

  if (!employerId) {
    return res.status(400).send({
      message: "Employer's id is required",
    });
  }

  try {
    const employees = await Employee.find({
      employer_id: employerId,
    });

    if (employees.length > 0) {
      return res
        .code(200)
        .send({ message: "Employees were found", employees: [...employees] });
    }

    return res.code(200).send({ message: "There are no employees" });
  } catch (error) {
    return res.code(500).send({
      message: error,
    });
  }
};

//* GET => Get one employee
exports.getEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    if (id == "me") {
      const employee = await Employee.findOne({ _id: req.employeeId }).exec();

      return res.status(200).send({
        message: "Employee was found",
        data: employee,
      });
    }

    const employee = await Employee.findOne({ _id: id }).exec();

    if (!employee) {
      return res.status(400).send({
        message: "Employee was not found",
      });
    } else {
      return res.status(200).send({
        message: "Employee was found",
        data: employee,
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: "Wrong id pattern",
      description: error,
    });
  }
};

//* DELETE => delete an employee
exports.deleteEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await Employee.findOneAndDelete({ _id: id });

    if (!employee) {
      return res.status(400).send({
        message: "Employee was not found",
      });
    } else {
      return res.status(200).send({
        message: "Employee successfully deleted",
        employee,
      });
    }
  } catch (err) {
    return res.status(400).send({
      error: "Error while deleting an employee",
      description: err,
    });
  }
};

//* PUT => Update employee's fullname vs phone number
exports.editEmployee = async (req, res) => {
  const id = req.params.id;

  let hashedPassword = null;

  const editOpts = {
    fullname: req.body.fullname,
    phone_number: req.body.phone_number,
  };

  if (req.body.password?.length >= 8) {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    editOpts.password = hashedPassword;
  }

  try {
    const employee = await Employee.findByIdAndUpdate(id, {
      $set: editOpts,
    });

    if (!employee) {
      return res.status(400).send({
        message: "Employee was not found",
      });
    } else {
      return res.status(200).send({
        message: "Employee successfully updated",
        employee,
      });
    }
  } catch (err) {
    return res.status(400).send({
      error: "Error while updating an employee",
      description: err,
    });
  }
};

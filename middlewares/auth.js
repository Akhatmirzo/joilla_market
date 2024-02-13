const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Employer = require("../models/Employer");
const Employee = require("../models/Employee");

const auth = (permissions) => {
  return (req, res, done) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send({ error: "Token was not found" });
    }

    jwt.verify(
      token,
      process.env.jwt_secret_key,
      async function (err, decoded) {
        if (err) {
          res.code(400).send({
            error: "Invalid token",
            description: err,
          });
          return;
        }

        const role = decoded.role;

        if (role === "admin" && permissions.includes(role)) {
          const { email } = decoded;

          const admin = await Admin.findOne({ email }).exec();

          if (!admin) {
            return res.code(401).send({ error: "Unauthorized Admin" });
          }

          req.adminId = admin._id;
          done();
          return;
        }

        if (role === "employer" && permissions.includes(role)) {
          const { phone_number } = decoded;

          const employer = await Employer.findOne({ phone_number }).exec();

          if (!employer) {
            return res.code(401).send({ error: "Unauthorized Employer" });
          }

          req.employerId = employer._id;
          done();
          return;
        }

        if (role === "employee" && permissions.includes(role)) {
          const { phone_number } = decoded;

          const employee = await Employee.findOne({ phone_number }).exec();

          if (!employee) {
            return res.code(401).send({ error: "Unauthorized Employee" });
          }

          req.employeeId = employee._id;
          req.employerId = employee.employer_id;
          done();
          return;
        }
        return res
          .status(401)
          .send({ message: "This user is not permitted to get data!" });
      }
    );
  };
};

module.exports = auth;

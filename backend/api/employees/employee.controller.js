const {
  create,
  getEmployeeByEmployeeEmail,
  getEmployeeByEmployeeId,
  getEmployees,
  updateEmployee,
  deleteEmployee
} = require("./employee.service");
const bcrypt = require("bcrypt");

module.exports = {
  createEmployee: async (req, res) => {
    const body = req.body;
    try {
      const body = req.body;
      const hashedPassword = await bcrypt.hash(body.loginPassword, 10);
      body.loginPassword = hashedPassword;
      const results = await create(body);
      if(!results){
        return res.json({
          success: 0,
          message: "Failed to create user"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Employee created successfully",
        data: results
      });
    } catch (err) {
      console.log("1",err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error"
      });
    }
  },
  login: async (req, res) => {
    const body = req.body;
    try {
      const results = await getEmployeeByEmployeeEmail(body.email);
      if (!results) {
        return res.json({
          success: 0,
          message: "Invalid email"
        });
      }
      const result = await bcrypt.compare(body.password, results.login_password);
      if (result) {
        results.login_password = undefined;
        return res.json({
          success: 1,
          message: "Login successful",
        });
      } else {
        return res.json({
          success: 0,
          message: "Invalid password"
        });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        success: 0,
        message: "An error occurred"
      });
    }
  },
  getEmployees: async (req, res) => {
    try {
      const results = await getEmployees();
      return res.json({
        success: 1,
        message: "Employees fetched successfully",
        data: results
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error"
      });
    }
  },
  
  updateEmployees: async (req, res) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const result = await updateEmployee(body,id);
      if (!result) {
        return res.json({
          success: 0,
          message: "Failed to update user"
        });
      }
      return res.json({
        success: 1,
        message: "Updated successfully"
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        success: 0,
        message: "Database connection error"
      });
    }
  },
  
};
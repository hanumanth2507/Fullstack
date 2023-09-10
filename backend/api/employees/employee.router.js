const router = require("express").Router();
const {
  createEmployee,
  login,
  getEmployees,
  updateEmployees,
} = require("./employee.controller");


router.get("/employees", getEmployees);
router.post("/register", createEmployee);
router.post("/login", login);
router.put("/edit/:id", updateEmployees);

module.exports = router;
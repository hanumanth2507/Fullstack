const pool = require("../../config/database");

module.exports = {
  create: (data) => {
    return new Promise(async (resolve, reject) => {
      await pool.query(
        `insert into employees_master(employee_code, full_name, designation, email, mobile_number, login_password, date_of_birth, date_of_joining, available_status) 
                  values($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          data.employeeCode,
          data.fullName,
          data.designation,
          data.email,
          data.mobileNumber,
          data.loginPassword,
          data.dateOfBirth,
          data.dateOfJoining,
          data.availableStatus
        ],
        (error, results, fields) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  getEmployeeByEmployeeEmail: (email) => {
    return new Promise(async (resolve, reject) => {
      const employee = await pool.query(
        `select * from employees_master where email = $1`,
        [email]
        );
        if(!employee){
          reject(error);
        }
      resolve(employee.rows[0]);
    });
  },
  getEmployees: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await pool.query(
          `select employee_code, full_name, designation, available_status from employees_master`,
          []
        );
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  },
  updateEmployee: (data,id) => {
    return new Promise(async (resolve, reject) => {
      await pool.query(
        `update employees_master set full_name= $1, designation= $2, mobile_number= $3, available_status= $4 where user_id = $5`,
        [
          data.fullName,
          data.designation,
          data.mobileNumber,
          data.availableStatus,
          data.id
        ],
        (error, results, fields) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
};
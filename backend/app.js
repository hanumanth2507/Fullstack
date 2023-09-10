require("dotenv").config();
const express = require("express");
const app = express();
const employeeRouter = require("./api/employees/employee.router");

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use("/api", employeeRouter);

app.listen(process.env.APP_PORT, () =>{
    console.log(`listening on port ${process.env.APP_PORT}`)
});
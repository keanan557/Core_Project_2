// import server connection
import {pool} from "../config/config.js"

// functions and sql queries

// getEmployees
const getEmployees = async()=>{
    let [data] = await pool.query('select * from employees')
    return data
}

// insertEmployees
const insertEmployees =async(employee_namr)=>{
    await pool.query("insert into employees()")
}

// deleteEmployees


// updateEmployees



// export
export {getEmployees}
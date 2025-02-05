// import mysql
import mysql from 'mysql2/promise'

// import .env
import {config} from 'dotenv'
config();

// store port in variable
const PORT = process.env.PORT || 3000

// create mysql connection 
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

// export
export {pool}

import mysql from "mysql";



//settings to join with sql database
export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Deyasaleh@12",
  database:"blog"
})
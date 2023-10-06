import express from 'express'
import mysql, { createConnection } from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "12345"
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM venue";
    db.query(sql, (err, result)=> {
        if(err) return res.json({Message: "Errorinside server"});
        return res,hson(result);
    })
})

app.listen(9000, ()=>{
    console.log("listening");
})
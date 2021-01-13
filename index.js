const mysql = require('mysql');
const express = require('express');
var app = express();
//const bodyparser = require('body-parser');
var router=express.Router()
//app.use(bodyparser.json());
app.use(express.json());


var checkUrl=function(req,res,next){
    console.warn("current url is :",req.originalUrl)
    next();
}


app.use(checkUrl)
app.use('/',router)



var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '74654486',
    database: 'EmployeeDB'
});

con.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is running at port no : 3000'));

app.get('/employees', (req, res) => {
    con.query('SELECT * FROM Employee', (err, rows, fields) => {
        if (!err)
            //res.send(rows);
            res.json(rows)  
        else
            console.log(err);
    })
});


app.delete('/employees/:id', (req, res) => {
    con.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});



app.put('/employees/:id', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE Employee SET Name=?,EmpCode=?,Salary=? WHERE EmpID =?";
    con.query(sql, [ emp.Name, emp.EmpCode, emp.Salary,req.params.id],(err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
})   

app.post('/employees', (req, res) => {
    let emp=req.body;
    var name=emp.Name;
    var empCode=emp.EmpCode
    var salary=emp.Salary;
    var sql="INSERT INTO Employee(Name,EmpCode,Salary) values(?,?,?)"
    con.query(sql, [ emp.Name, emp.EmpCode, emp.Salary,req.params.id],(err,rows,fields)=>{
        if(err)
            console.log(err)
        else
            res.send('date inserted successfully')
    })
    
})
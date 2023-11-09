var express = require('express')
var router = express.Router()

var mySql = require('mysql')

const con = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'SP444',
})

con.connect((err) => {
  if (err) throw err
  console.log('Connected to database!')
})

// GET Homepage
router.get('/', function (req, res, next) {
  let sql = 'SELECT * FROM student'
  con.query(sql, (err, results, fields) => {
    if (err) throw err
    console.log(results)
    res.render('index', {
      title: 'Express',
      description: 'Student Record',
      data: JSON.stringify(results),
    })
  })
})

// GET Student
router.get('/student', function (req, res) {
  let sql = 'SELECT * FROM student'
  con.query(sql, (err, results, fields) => {
    if (err) throw err
    res.render('student', {
      title: 'Insert Student Record',
      description: 'Insert a student record',
    })
  })
})

// POST Student
router.post('/student', (req, res) => {
  const id = req.query.id
  const fname = req.query.fname
  const lname = req.query.lname
  const major = req.query.major
  const year = req.query.year

  // prettier-ignore
  let sql = "INSERT INTO student(std_id, std_fname, std_lname, std_major, std_year) VALUES (?, ?, ?, ?, ?)"
  con.query(sql, [id, fname, lname, major, year], (err, results, fields) => {
    if (err) {
      res.status(500).json({ message: err.message })
      return
    }
    res.status(200).json({ message: 'Success', data: results })
    return
  })
})

module.exports = router

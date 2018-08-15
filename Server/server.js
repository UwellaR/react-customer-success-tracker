var express = require('express')
var app = express()
var path = require('path')
var multer = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage})
var cloudinary = require('cloudinary').v2
var bodyParser = require('body-parser')
const pg = require('pg');

const pool = new pg.Pool({
  user: '##############################################',
  host: '#####################################################',
  database: '###############################################',
  password: '######################################################',
  port: '5432'
});

cloudinary.config({
  cloud_name: '#########################',
  api_key: '#########################',
  api_secret: '###########################'
});

app.use(express.static(__dirname + '/public/build'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/viewfeedback', function (req,res){
  res.sendFile(path.join(__dirname, 'public/build/index.html'))
})

app.get('/feedbacks', function (req,res) {
  const query = 'SELECT * FROM FEEDBACK';
  pool.query(query, (err, result) => {
    console.log(err, result);
    res.send({data : result});
  });
})

app.get('/feedback/:id', function (req,res) {
  const query = `SELECT * FROM FEEDBACK WHERE ID = ${req.params.id}`;
  pool.query(query, (err, result) => {
    console.log(err, result);
    res.send({data : result});
  });
})

app.post('/feedback', upload.single('screenshot'), function (req, res) {
  const values = req.body;
  cloudinary.uploader.upload_stream({resource_type: 'auto'}, function(err,image){
  if (err){
     console.warn(err);
   }
  const query = `INSERT INTO FEEDBACK(first_name, last_name, address, phone_number, comments, img) VALUES ('${values.firstname}', '${values.lastname}', '${values.address}', '${values.phone_number}', '${values.message}', '${image.url}')`;
   pool.query(query, (err, result) => {
     console.log(err, result);
     res.send('completed');
   });
 }).end(req.file.buffer);

})

app.put('/feedback', function (req, res) {
  console.log('values are ',Object.keys(req.body)[0], req.body, typeof req.body);
  const values = JSON.parse(Object.keys(req.body)[0]);
  const query = `UPDATE FEEDBACK SET status = '${values.status}' WHERE ID = ${values.id}`;
  pool.query(query, (err, result) => {
    console.log('err put ', err, result);
    res.json({data : result});
  });
})

var port = process.env.PORT || 3010;
app.listen(port, function() {
  console.log(`Server has started ${port}`);
});

const express = require('express')
const app = express()
const router = express.Router()
const fs = require("fs")
const path = require("path")
const SERVER_PORT = 8082;


/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html')
})

/*
- Return all details from user.json file to client as JSON format
*/

router.get('/users', (req, res) => {
  try{
    const fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, 'user.json'), 'utf8'))
    res.json(fileContents)
    return
  }catch(err){
    console.log(err)
  }
  res.status(500).send("Internal server error.");
})


/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

router.get('/login', (req, res) => {
  try{
    const fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, 'user.json'), 'utf8'))
    if(req.query.username === fileContents.username && req.query.password === fileContents.password){
      res.json({status: true, message: "User Is valid"})
      return
    }else if(req.query.username !== fileContents.username){
      res.json({status: false, message: "User Name is invalid"})
      return
    }else if(req.query.password !== fileContents.password){
      res.json({status: false, message: "Password is invalid"})
      return
    }
  }
  catch(err){
    console.log(err)
  }
  res.status(500).send("Internal server error.");
})


//router.get('/login', (req,res) => {
//  res.send('This is login router');
//  if(req.query.username == "admin" && req.query.password == "admin"){
//    res.send({
//      status: true,
//      message: "User Is valid"
//    })
//  }
//
//  else if(req.query.username != "admin"){
//    res.send({
//      status: false,
//      message: "User Name is invalid"
//    })
//  }
//
//  else if(req.query.password != "admin"){
//    res.send({
//      status: false,
//      message: "Password is invalid"
//    })
//  }
//
//});


/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  res.send(`<b>${req.params.username} successfully logout.<b>`);
});


app.use('/', router);

app.listen(process.env.port || 8082);

console.log('Web Server is listening at port '+ (process.env.port || 8082));
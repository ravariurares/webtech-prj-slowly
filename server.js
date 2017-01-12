var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var Sequelize=require("sequelize");

var app = express();
app.use(bodyParser.json());
app.use(cors());

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

var sequelize=new Sequelize('slowlydb','ravariurares','',{
    dialect:'mysql',
    host:'127.0.0.1',
    port:3306
});



//define entity
var Users=sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type:Sequelize.STRING,
        field:'email'
    },
    password:{
        type:Sequelize.STRING,
        field:'password'
    },
    users_codes:{
        type:Sequelize.STRING,
        field:'users_codes'
    }
},{
     timestamps:false   
})

//define entity
var Fallow=sequelize.define('fallow',{
    id:{
        type:Sequelize.INTEGER,
        field:'id',
        primaryKey: true,
        autoIncrement: true
    },
    users_codes:{
        type:Sequelize.STRING,
        field:'users_codes'
    },
    users_fallowes:{
        type:Sequelize.STRING,
        field:'users_fallowes'
    },
    speed:{
        type:Sequelize.FLOAT,
        field:'speed'
    },
     location:{
        type:Sequelize.STRING,
        field:'location'
    }
},{
     timestamps:false   
})

 
//foreign key Users-Users
//Users.belongsTo(Users, {foreignKey: 'users_codes'});
//Fallow.hasOne(Fallow, {foreignKey: 'users_codes'});




// create an users
app.post('/users', function(request,response) {
  Users.create(request.body).then(function(users) {
      Users.findById(users.id).then(function(users) {
          response.status(201).send(users);
      });
  });
});

app.get('/users/:id', function(request,response){
    Users.findById(request.params.id).then(function(users){
        if(users) {
            response.status(200).send(users);
        } else {
            response.status(404).send();
        }
    });
});

app.get('/fallows', function(request,response){
    Fallow.findAll().then(function(users){
        response.status(200).send(users);
    });
});






// create an users
app.post('/fallow', function(request,response) {
  Fallow.create(request.body).then(function(fallow) {
      Fallow.findById(fallow.id).then(function(fallow) {
          response.status(201).send(fallow);
      });
  });
});







// include static files in the admin folder
app.use('/admin', express.static('admin'));


app.listen(process.env.PORT);
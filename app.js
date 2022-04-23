const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/employesDB");
const employesSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
});
const Employe = mongoose.model("Employe", employesSchema);
const employe1 = new Employe({
  // sl: 1,
  name: "Rahul Patra",
  email: "rahul.patra@gmail.com",
  address: "Kolkata,pin-700021,West Bengal",
  phone: "+91 9679606243",

});
const employe2 = new Employe({
  // sl: 2,
  name: "Sid Patra",
  email: "sid.patra@gmail.com",
  address: "Bankura",
  phone: "+91 967979999",

});
const employeList = [employe1, employe2];



app.get("/", function(req, res) {
  Employe.find(function(err, employes) {
    if (employes.length === 0) {
      Employe.insertMany(employeList, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("add Successfully");
        }
        res.redirect("/");
      });

    } else {
      // Employe.updateMany({name:"du"},{$set: {phone:9999999999}});

      res.render("home", {
        employeData: employes
      });
    }

  });

});

app.get("/addNewEmploye", function(req, res) {
  res.render("addNewEmploye", );
});
app.post("/addNewEmploye", function(req, res) {
  const addEmploye = new Employe({
    name: req.body.name1,
    email: req.body.email1,
    address: req.body.address1,
    phone: req.body.phone1,
  });
  addEmploye.save();
  res.redirect("/");
});

app.post("/delete", function(req, res) {
  var clickedEmployId = req.body.employeId;
  Employe.deleteMany({_id: clickedEmployId}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully delete")
    }
  });
console.log(clickedEmployId);
  res.redirect("/");

});

app.get("/:gettingPosition", function(req, res) {
  const gettingPosition = req.params.gettingPosition;
  Employe.find(function(err, employes) {

      res.render("edit", {
        employeData: employes,
        i: gettingPosition,
      });
    });
});
// app.post("/edit", function(req, res) {
//   // const editPersonData = new Employe({
//   //   name: req.body.nameEdit,
//   //   email: req.body.emailEdit,
//   //   address: req.body.addressEdit,
//   //   phone: req.body.phoneEdit,
//   // });
//
// // console.log(editPersonData);
// // console.log(editPersonData._id);
//
// // Employe.updateMany({name:"du"},{$set: {phone:9999999999}});
//
// });



app.listen("3000", function() {
  console.log("im on at port 3000");
});

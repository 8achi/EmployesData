const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


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
    type: Number,
    required: true,

  },
});
const Employe = mongoose.model("Employe", employesSchema);

app.get("/", function(req, res) {
  Employe.find(function(err, employes) {
    res.render("home", {
      employeData: employes
    });
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
  const clickedEmployId = req.body.employeId;
  Employe.deleteMany({
    _id: clickedEmployId
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully delete")
    }
  });
  console.log(clickedEmployId);
  res.redirect("/");

});

app.post("/delete_multiple", function(req, res) {
  console.log("hi");
  var idForMultipleDelete  = req.body.dltArr;
  console.log(idForMultipleDelete);
    for (var j = 0; j < idForMultipleDelete.length; j++) {
      Employe.deleteOne({
        _id: idForMultipleDelete[j]}, function(err, docs) {
        if (err) {
          console.log("something went wrong" + err);
        } else {
          console.log(idForMultipleDelete);
          console.log("successfully delete")

        }
      });
    }
    // res.redirect("/");
    res.status(err.status || 200).json({status: err.status, message: err.message})

});

app.get("/:gettingID", function(req, res) {
  var gettingID = req.params.gettingID.toString();
  console.log(gettingID);

  Employe.findOne({
    _id: gettingID
  }, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log("Result : " + result);
      console.log(result.name);
      Employe.find(function(err, employes) {

        res.render("edit", {
          employeData: result,
          id: gettingID,
        });
      });
    }
  });

});
app.post("/edit", function(req, res) {
  const editPersonData = new Employe({
    name: req.body.updateName,
    email: req.body.updateEmail,
    address: req.body.updateAddress,
    phone: req.body.updatePhone,

  });
  const id = req.body._id.toString()
  Employe.updateOne({
    _id: id
  }, {
    name: editPersonData.name,
    email: editPersonData.email,
    address: editPersonData.address,
    phone: editPersonData.phone
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated succesfully")
    }
  });

  console.log(editPersonData);
  console.log(id);
  res.redirect("/");

});

app.post('/cancel', function(req, res) {
  res.redirect("/");
})



app.listen("3000", function() {
  console.log("im on at port 3000");
});

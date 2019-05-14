const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const models = require('./models')
const PORT = 8080

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

app.post('/register',(req,res) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastname
  let email = req.body.email
  let password = req.body.password

  bcrypt.has(password,6,function(err,hash) {
    let user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash
    }

    console.log('bcrypt user created')

    models.User.create(user).then(user => {
      console.log(user)
    })
  })
})

app.post('/api/properties',(req,res) => {
  let rentalid = req.body.rentalid
  let address = req.body.address
  let city = req.body.city
  let state = req.body.state
  let zipcode = req.body.zipcode
  let hcad = req.body.hcad
  let insured = req.body.insured
  let insuredamount = req.body.insuredamount
  let tenantid = req.body.tenantid
  let rent = req.body.rent

  let rental = {
    rentalid: rentalid,
    address: address,
    city: city,
    state: state,
    zipcode: zipcode,
    hcad: hcad,
    insured: insured,
    insuredamount: insuredamount,
    tenantid: tenantid,
    rent: rent
  }

  models.Property.create(rental).then(rental => {
    console.log('Property model created.')
    console.log(rental)
  })

  res.json({message: 'Property added successfully.'})
})

app.post('/api/tenants',(req,res) => {
  let firstname = req.body.firstname
  let lastname = req.body.lastname
  let phoneno = req.body.phoneno
  let propertyid = req.body.propertyid
  console.log("propertyid: " + propertyid);

  let tenant = {
    firstname: firstname,
    lastname: lastname,
    phoneno: phoneno,
    propertyid: propertyid
  }

  models.Tenant.create(tenant).then(tenant => {
    console.log('Tenant model created.')
    console.log(tenant)
  })

  res.json({message: 'Tenant added successfully.'})
})

app.get('/api/availableRentals',(req,res) => {
  models.Property.findAll({
  }).then(availableRentalsList => {
    console.log(availableRentalsList);
    res.json({availableRentalsList: availableRentalsList})
  })
})

app.listen(PORT,() => {
  console.log('Server is running...')
})

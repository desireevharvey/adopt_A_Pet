// dependencies
const db = require("../models")
const express = require('express')
const router = express.Router()
const seedData = require('../models/dogSeed')

/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/location`
---------------------------------------------------------------------------------------
*/

router.get('/dogs/seed', (req, res) => {
    db.Dog.deleteMany({}, (err, dogs) => {
        if (err) {
            console.log('Error occured in remove', err)
        } else {
            console.log('Removed all dogs')
    
            db.Dog.insertMany(seedData, (err, dogs) => {
                if (err) {
                    console.log('Error occured in insertMany', err)
                } else {
                    console.log('Created', dogs.length, "dogs")
                    res.redirect('/dogs')
                }
            })
        }
    })
    
})

// get route /cats/
router.get('/', (req, res) => {
    db.Dog.find({}, (err, dogs) => {
        if (err) return console.log(err);
        res.render('dogsIndex', { dogs: dogs});
    })
})

// New Route (GET/Read): This route renders a form the user will use to POST (create) a new location
router.get('/new', (req, res) => {
    res.render('newDog', {
        tabTitle: "Dog Creation"
    })
})

// Create Route (POST/Create): This route receives the POST request sent from the new route above, parses it into a location object, creates the location object as a document in the locations collection, and redirects the user back to the root/home page
router.post('/', (req, res) => {
    if (req.body.visited) {
        req.body.visited = true
    } else {
        req.body.visited = false
    }
    db.Dog.create(req.body, (err, dog) => {
        res.redirect('/')
    })
})

// Show Route (GET/Read): This route will show an individual location document using the URL parameter (which will always be the location document's ID)
router.get('/:id', (req, res) => {
    db.Dog.findById(req.params.id, (err, dog) => {
        res.render("showDog", {
            dog: dog,
            tabTitle: "Dog: " + dog.name
        })
    })
})

// export these routes so that they are acessible in `server.js`
module.exports = router
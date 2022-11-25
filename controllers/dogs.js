// dependencies
const db = require("../models")
const express = require('express')
const router = express.Router()
const seedData = require('../models/dogSeed')



router.get('/seed', (req, res) => {
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

// I.N.D.U.C.E.S = index, new, delete, update, create, edit, show

// get route /dogs/ (index)
router.get('/', (req, res) => {
    db.Dog.find({}, (err, dogs) => {
        if (err) return console.log(err);
        res.render('dogsIndex', { dogs: dogs});
    })
})


// New Route
router.get('/new', (req, res) => {
    res.render('newDog', {
        tabTitle: "Dog Creation"
    })
})

//delete (Adopt) route
router.delete('/:id', (req, res) => {
    db.Dog.findByIdAndRemove(req.params.id, (err, dog) => {
        res.redirect("/dogs")
    })
})

// edit route (update)
router.put('/:id', (req, res) => {
    db.Dog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, dog) => {
        res.redirect('/dogs/' + dog._id)
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
        res.redirect('/dogs')
    })
})

// edit
router.get('/:id/edit', (req, res) => {
    db.Dog.findById(req.params.id, (err, dog) => {
        res.render("editDog", {
            dog: dog
        })
    })
})

// Show Route 
router.get('/:id', (req, res) => {
    db.Dog.findById(req.params.id, (err, dog) => {
        res.render("showDog", {
            dog: dog
            // tabTitle: "Dog: " + dog.name
        })
    })
})

// export these routes so that they are acessible in `server.js`
module.exports = router
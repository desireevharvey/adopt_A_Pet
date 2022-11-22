// dependencies
const db = require("../models")
const express = require('express')
const router = express.Router()
const seedData = require('../models/catSeed')

/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/location`
---------------------------------------------------------------------------------------
*/

router.get('/cats/seed', (req, res) => {
    db.Cat.deleteMany({}, (err, cats) => {
        if (err) {
            console.log('Error occured in remove', err)
        } else {
            console.log('Removed all cats')
    
            db.Cat.insertMany(seedData, (err, cats) => {
                if (err) {
                    console.log('Error occured in insertMany', err)
                } else {
                    console.log('Created', cats.length, "cats")
                    res.redirect('/cats')
                }
            })
        }
    })
    
})

// get route /cats/
router.get('/', (req, res) => {
    db.Cat.find({}, (err, cats) => {
        if (err) return console.log(err);
        res.render('catsIndex', { cats: cats});
    })
})


// New Route (GET/Read): This route renders a form the user will use to POST (create) a new location
router.get('/new', (req, res) => {
    res.render('newCat', {
        tabTitle: "Cat Creation"
    })
})

// Create Route (POST/Create): This route receives the POST request sent from the new route above, parses it into a location object, creates the location object as a document in the locations collection, and redirects the user back to the root/home page
router.post('/', (req, res) => {
    if (req.body.visited) {
        req.body.visited = true
    } else {
        req.body.visited = false
    }
    db.Cat.create(req.body, (err, cat) => {
        res.redirect('/')
    })
})

// Show Route (GET/Read): This route will show an individual location document using the URL parameter (which will always be the location document's ID)
router.get('/:id', (req, res) => {
    db.Cat.findById(req.params.id, (err, cat) => {
        res.render("showCat", {
            cat: cat,
            tabTitle: "Cat: " + cat.name
        })
    })
})

// export these routes so that they are acessible in `server.js`
module.exports = router
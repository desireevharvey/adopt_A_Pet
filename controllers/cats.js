// dependencies
const db = require("../models")
const express = require('express')
const router = express.Router()
const seedData = require('../models/catSeed')



router.get('/seed', (req, res) => {
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

// I.N.D.U.C.E.S = index, new, delete, update, create, edit, show

// get route /cats/ (index)
router.get('/', (req, res) => {
    db.Cat.find({}, (err, cats) => {
        if (err) return console.log(err);
        res.render('catsIndex', { cats: cats});
    })
})


// New Route
router.get('/new', (req, res) => {
    res.render('newCat', {
        tabTitle: "Cat Creation"
    })
})

//delete (Adopt) route
router.delete('/:id', (req, res) => {
    db.Cat.findByIdAndRemove(req.params.id, (err, cat) => {
        res.redirect("/cats")
    })
})

// edit route (update)
router.put('/:id', (req, res) => {
    db.Cat.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, cat) => {
        res.redirect('/cats/' + cat._id)
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
        res.redirect('/cats')
    })
})

// edit
router.get('/:id/edit', (req, res) => {
    db.Cat.findById(req.params.id, (err, cat) => {
        res.render("editCat", {
            cat: cat
        })
    })
})

// Show Route 
router.get('/:id', (req, res) => {
    db.Cat.findById(req.params.id, (err, cat) => {
        res.render("showCat", {
            cat: cat
            // tabTitle: "Cat: " + cat.name
        })
    })
})

// export these routes so that they are acessible in `server.js`
module.exports = router
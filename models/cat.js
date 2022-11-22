// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// created a cat schema
const catSchema = new Schema(
    {
        name: { type: String, required: true },
        breed: { type: String, required: true },
        gender: { type: String, required: true },
        img: { type: String, default: 'https://sainfoinc.com/wp-content/uploads/2018/02/image-not-available-570x570.jpg' },

    })
// create a cat model using cat schema
const Cat = mongoose.model('Cat', catSchema)
// export the cat model, will be accessed in `index.js`


module.exports = Cat
// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// created a cat schema
const dogSchema = new Schema(
    {
        name: { type: String, required: true },
        breed: { type: String, required: true },
        gender: { type: String, required: true },
        img: { type: String, default: 'https://sainfoinc.com/wp-content/uploads/2018/02/image-not-available-570x570.jpg' },

    })
// create a cat model using cat schema
const Dog = mongoose.model('Dog', dogSchema)
// export the dog model, will be accessed in `index.js`


module.exports = Dog
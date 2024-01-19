// Create web server
// Import express
const express = require('express')
// Create express app
const app = express()
// Import body-parser
const bodyParser = require('body-parser')

// Import mongoose
const mongoose = require('mongoose')
// Connect to database
mongoose.connect('mongodb://localhost:27017/itc-230')

// Import our model
const Comment = require('./models/comment')

// Import method-override
const methodOverride = require('method-override')

// Tell express to use method-override
app.use(methodOverride('_method'))

// Tell express to use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// Set up handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set up public folder
app.use(express.static('public'))

// Set up routes
// Index route
app.get('/', (req, res) => {
  Comment.find({})
    .then(comments => {
      res.render('comments-index', { comments: comments })
    })
    .catch(err => {
      console.log(err)
    })
})

// New route
app.get('/comments/new', (req, res) => {
  res.render('comments-new')
})

// Create route
app.post('/comments', (req, res) => {
  Comment.create(req.body)
    .then(comment => {
      res.redirect(`/comments/${comment._id}`)
    })
    .catch(err => {
      console.log(err)
    })
})

// Show route
app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
      res.render('comments-show', { comment: comment })
    })
    .catch(err => {
      console.log(err)
    })
})

// Edit route
app.get('/comments/:id/edit', (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
      res.render('comments-edit', { comment: comment })
    })
    .catch(err => {
      console.log(err)
    })
})

// Update route
app.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body)
    .then(comment => {
      res.redirect(`/comments/${comment._id}`)
    })
    .catch(err => {
      console.log(err) }) })
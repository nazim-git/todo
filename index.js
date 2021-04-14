var express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appRoute = express.Router();
const Todo = require('./todo.model');
var app = express();
app.use(cors());
app.use(bodyParser.json());
appRoute.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
mongoose.connect(process.env.mongooseURI,
    { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.route('/').get(function (req, res) {
    res.json('Express server working');
});

app.route('/addTodo').post(function (req, res) {
    let reqs = req.body;
    let todo = new Todo(reqs);
    todo.save()
        .then(todo => {
            res.status(200).json(todo);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.route('/todos').get(function (req, res) {
    Todo.find({}, function (err, todos) {
        if (!err)
            res.json(todos);
        else
            res.json(err);
    });
});

app.route('/todo/:id').get(function (req, res) {
    Todo.findOne(req.param.id, function (err, todo) {
        if (!err)
            res.json(todo);
        else
            res.json(err);
    });
});

app.route('/updateTodo/:todo_id').post(function (req, res) {
    Todo.findOneAndUpdate({ _id: req.params.todo_id }, { $set: req.body })
        .then(_ => res.json("Update sucessfull"))
        .catch(err => res.status(400).send(err))
});

app.route('/deleteTodo/:todo_id').delete(function (req, res) {
    Todo.remove({ _id: req.params.todo_id })
        .then(_ => res.json("Delete sucessfull"))
        .catch(err => res.status(400).send(err))
});

app.listen(process.env.PORT || 5000)
exports = module.exports = app;
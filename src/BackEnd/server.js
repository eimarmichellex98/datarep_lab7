const express = require('express')
const app = express()
const port = 4000 //changed to 4000 as 3000 is hosting another server
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require('mongoose') //used to connect us to mongoDB (database)

//cors
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

//bodyParser/ parse application
app.use(bodyParser.urlencoded({extended: false}))
//parse application/json
app.use(bodyParser.json())
// connecting with mongoDB
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.kwywb.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, {useNewUrlParser: true});
//making a schema for database 
const Schema = mongoose.Schema;
//data we are going to store 
var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
})
//MovieModel is what we call now when we want to interact with the database
var MovieModel = mongoose.model("movie", movieSchema);

app.get('/api/movies', (req,res) =>{
    //array of movies
   /* const myMovies = [
        {
            "Title":"Avengers: Infinity War",
            "Year":"2018",
            "imdbID":"tt4154756",
            "Type":"movie",
            "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
            },
            {
            "Title":"Captain America: Civil War",
            "Year":"2016",
            "imdbID":"tt3498820",
            "Type":"movie",
            "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
            },
            {
            "Title":"World War Z",
            "Year":"2013",
            "imdbID":"tt0816711",
            "Type":"movie",
            "Poster":"https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"}
            ,{
            "Title":"War of the Worlds",
            "Year":"2005",
            "imdbID":"tt0407304",
            "Type":"movie",
                "Poster":"https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
            }
    ];*/
    //find all documents in database
    MovieModel.find((err, data)=>{
        res.json(data)
    })
    //res.status(200).json({movies: myMovies});
})
//
app.get('api/movies/:id', (req,res)=>{
    console.log(req.params.id);
    MovieModel.findById(req.params.id, (err, data)=>{
        res.json(data);
    })
})
//delete movies
app.delete('/api/movies/:id', (req,res)=>{
    console.log("Delete Movie: "+req.params.id);

    MovieModel.findByIdAndDelete(req.params.id, (err,data)=>{
        res.send(data);
    })
})


app.post('/api/movies', (req, res) =>{
    console.log("Movie Received");
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
        title: req.body.title,
        year:req.body.year,
        poster:req.body.poster
    })

    res.send('Item added');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
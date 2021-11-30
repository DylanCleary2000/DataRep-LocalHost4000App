const express = require('express')
const app = express()
const port = 4000
//Install Cors - Cross Origin Resource Sharing.(ON SERVER)
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Configuration - telling where build and static folders are.
app.use(express.static(path.join(__dirname,'../build')));
app.use('/static',express.static(path.join(__dirname,'build//static')));

//Parse application/json
app.use(express.json());
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//Connecting server to database
const myConnectionString = 'mongodb+srv://admin:Sevta203@cluster0.njzou.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

const Schema = mongoose.Schema;

//Defining Schema - What documents in database will look like
var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String

});

//Use this model to interact with database.
var MovieModel = mongoose.model("movie", movieSchema);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Now server displays out movie data in JSON Format.
app.get('/api/movies', (req, res) => {
    // const mymovies = [

    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "World War Z",
    //         "Year": "2013",
    //         "imdbID": "tt0816711",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    //     }

    // ];

    MovieModel.find((err, data) => {
        res.json(data);
    })
    
    
})
//Get request and returns data at that ID
app.get('/api/movies/:id', (req,res)=>{
    console.log(req.params.id);

    //Callback function for when an ID is found.
    MovieModel.findById(req.params.id, (err,data)=>{
        res.json(data);
    })
})

app.put('/api/movies/:id', (req,res)=>{
    console.log("Update Movie: "+req.params.id);
    console.log(req.body);

    MovieModel.findByIdAndUpdate(req.params.id,req.body, {new:true},
        (err,data)=>{
            res.send(data);
        })
})

app.post('/api/movies', (req, res) => {
    console.log('Movie Recieved');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    //Creates document in our mongo database.
    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    })

    //Response to confirm that movie has been added to database.
    res.send('Item Added');
})

//HTTP request with delete method,pulls id out of url and finds its match within the database,deletes that record.
app.delete('/api/movies/:id',(req,res)=>{
    console.log("Delete Movie: "+req.params.id);

    MovieModel.findByIdAndDelete(req.params.id,(err, data)=>{
        res.send(data);
    })
})

//For any other URL will send back index.html.
app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname+'/../build/index.html'));


})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


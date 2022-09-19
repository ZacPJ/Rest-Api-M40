const Movie = require("./movieModel");

exports.addMovie = async (req, res) => {
    try {
        if (req.body.title && req.body.actor){
            console.log(req.body)
            await Movie.create({title: req.body.title, actor: req.body.actor});
            res.status(201).send({title: req.body.title, actor: req.body.actor});
        }
        else {
            console.log("no title or actor found")
            res.status(400).send({error: "no title or actor found"})
        }
    } catch (error) {
        console.log("error in add movie")
        res.status(500).send({error:"internal server error"})
        console.log(error)

    }
}

exports.listMovies = async (req, res) => {
    try {
        let movieList = await Movie.find({});
        if (movieList.length > 0){
            console.log("inside listMovies")
            res.status(200).send({movieList});
        }
        else {
            console.log("Nothing to display")
            res.status(400).send({error: "request failed, no movies to display"})
        }
    } catch (error) {
        console.log("error in listMovies")
        res.status(500).send({error:"internal server error"})
        console.log(error)
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        let movieList = await Movie.find({})
        console.log(movieList)
        if ((req.body.title && req.body.actor) && movieList.length > 0){
            await Movie.deleteOne({ title: req.body.title, actor: req.body.actor })
            res.status(200).send(await Movie.find({}))
        }
        else {
            console.log("Nothing to delete")
            res.status(400).send({error: "request failed"})
        }
    } catch (error) {
        console.log("error in deleteMovie")
        res.status(500).send({error:"internal server error"})
        console.log(error)
    }
}

exports.deleteMovies = async (req, res) => {
    try {
        let movieList = await Movie.find({})
        if (movieList.length > 0){
            await Movie.deleteMany({movieList})
            res.status(200).send("Contents deleted")
        }
        else {
            console.log("Nothing to delete")
            res.status(400).send({error: "request failed"})
        }
    } catch (error) {
        console.log("error in deleteMovies")
        res.status(500).send({error:"internal server error"})
        console.log(error)
    }
}

exports.editMovie = async (req, res) =>
{
    try
    {
        await Movie.updateOne({ title: req.body.title, actor: req.body.actor }, { title: req.body.newT, actor: req.body.newA })
        res.status(200).send(await Movie.find({}))
    } catch (error)
    {
        res.status(400).send(console.log("Failed to list items"))
        console.log(error)
    }
}

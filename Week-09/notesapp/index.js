const {authMiddleware} = require("./middleware")
const express = require("express")
const path = require("path")
const jwt = require("jsonwebtoken")


const app = express()
const notes = [];
const users = [];
app.use(express.json())

app.post('/signup', function(req, res) {
    const {username, password} = req.body
    const userExists = users.find(user => user.username === username)
    if (userExists) {
        res.status(403).json({
            message: "user with this username already exists"
        })
        return
        
    }
    users.push({username, password})

    res.status(201).json({message: "You have signed up successfully"})

})

app.post('/signin', function(req, res) {
    const {username, password} = req.body
    const userExists = users.find((user) => user.username === username && user.password === password);

    if(!userExists) {
        res.json({message: "Incorrect username or password"})
        return
    }

    const token = jwt.sign({
        username
    }, "samosaPaglu343348")

    res.json({token})
    
})

app.post('/notes', authMiddleware, function(req, res) {
    
    const username = req.username

    const note = req.body.note;
    notes.push({note, username})

    res.status(201).json({message: "Note created"})
})

app.get('/notes', authMiddleware, function(req, res) {
    const username = req.username
    const userNotes = notes.filter(note => note.username === username)
    res.status(200).json({notes: userNotes})
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./frontend/index.html"))
})
app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, "./frontend/signup.html"))
})
app.get('/signin', function(req, res) {
    res.sendFile(path.join(__dirname, "./frontend/signin.html"))
})

app.listen(3000, () => console.log("App is listening on port 3000"))
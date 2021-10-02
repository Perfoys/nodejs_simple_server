const express = require('express')
//const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

//handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))


app.get('/', (req, res) => {
    //res.status(200)
    //res.sendFile(path.join(__dirname, 'views', 'index.html'))
    res.render('index')
})

app.get('/about', (req, res) => {
    //res.sendFile(path.join(__dirname, 'views', 'about.html'))
    res.render('about')
})

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`)
})
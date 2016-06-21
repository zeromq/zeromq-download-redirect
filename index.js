const express = require('express')
const app = express()
const path = require('path')
const map = require('./map')

app.set('port', (process.env.PORT || 3000))

app.use('/static', express.static('static'))

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, './zeromq-download.html'))
})

app.get('*', function (req, res) {
    const path = req.path.substring(1) // truncating the leading slash

    if (map[path]) {
        res.redirect(301, map[path])
    }
    else {
        res.sendStatus(404)
    }
})

app.listen(app.get('port'))

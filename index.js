const express = require('express')
const app = express()
const path = require('path')
const map = require('./map')

app.set('port', (process.env.PORT || 3000))

app.get('/zeromq-logo.png', function(req,res) {
    res.sendFile(path.join(__dirname, './static/zeromq-logo.png'))
})

app.get('/MD5SUMS', function(req,res) {
    res.sendFile(path.join(__dirname, './static/MD5SUMS'), {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
})

app.get('/SHA1SUMS', function(req,res) {
    res.sendFile(path.join(__dirname, './static/SHA1SUMS'), {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
})

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, './static/zeromq-download.html'))
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

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors())

var cassandra = require('cassandra-driver')
var client = new cassandra.Client({
    contactPoints: ['cassandra:9042'],
    localDataCenter: "my_datacenter",
    keyspace: "express"
})

app.get('/customers', (req, res) => {

    client.execute('select * from express.customers', function (err, result) {
        if (err) throw err
        res.send(result.rows)
    })
})

app.get('/customers/:id', (req, res) => {

    client.execute(`select * from express.customers where id=${req.params.id}`, function (err, result) {
        if (err) throw err
        res.send(result.rows)
    })
})

app.delete('/customers/:id', (req, res) => {

    client.execute(`delete from express.customers where id=${req.params.id}`, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

app.put('/customers/:id', (req, res) => {

    client.execute(`update express.customers set name='${req.body.name}' where id=${req.params.id}`, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})


app.post('/customers', (req, res) => {

    client.execute('insert into express.customers(id,name) values(?, ?)', [req.body.id, req.body.name], { prepare: true }, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

app.listen(8080, () => console.log('Server ready'))
const express = require('express');
const app = express();
const path = require('path')
const port = 3000
const fruits = [
    {type: 'fruit', name: 'apple'},
    {type: 'fruit', name: 'banana'},
    {type: 'fruit', name: 'kiwi'},
]
app.get('/api/fruits', (req, res) => {
    res.status(200).send({fruits})
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.listen(port);

console.log('Running at Port ', port);
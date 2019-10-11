const express = require('express');
const db = require('./models')
const app = express();


app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res) {
    res.send('Welcome')
})
///---find all players---- send the json to page////
app.get('/players', function(req,res) {
    db.player.findAll({
        // sport: 'Basketball',
        // lastName: 'James',
        // position: 'Small-Forward',
        // jerseyNumber: 23
    }).then(function(player) {
        res.json(player);
    })
})
///---find 1 player---- by id////
app.get('/players/:id', function(req, res) {
    db.player.findByPk(parseInt(req.params.id))
    .then(function(foundplayer) {
        if(!foundplayer) {
            console.log('Error')
            res.send({'message': 'there was an error'})
        }else{
            res.json(foundplayer)
        }
    })
})
//---able to find a player if they dont exist then we create one---////
app.post('/players', function(req, res) {
    db.player.findOrCreate({
        where: {
            sport: req.body.sport
        },
        defaults: {
            lastName: req.body.lastName,
            position: req.body.position,
            jerseyNumber: req.body.jerseyNumber
        }
    }).spread(function(player, created) {
        res.redirect('/players')
    })
})

//---edit one user----//
app.put('/players/:id', function(req, res) {
    db.player.update(req.body, {
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(function(updateOne){
        res.redirect(`/players/${req.params.id}`)
    })
})
app.delete('/players/:id', function(req, res) {
    db.player.destroy({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(function(deletedOne){
        res.redirect('/players')
    })
})

app.listen(3000,function(){
    console.log('up and running')
})

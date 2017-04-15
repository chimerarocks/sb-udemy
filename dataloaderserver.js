var Schema = require('./swschema.js')
var express = require('express')
var graphql = require('express-graph.ql')
var Loader = require('./loader.js')
var app = express()

app.use(function(req, res, next) {
	req.loader = Loader()
	next()
})

app.post('/query', graphql(Schema))

app.get('/', function(req, res) {
	var film = req.query.film

	Schema(req.loader)(`
		query find ($film: Int!) {
			film: find_film(id: $film) {
				title
				release_date
				characters (limit: 3) {
					name
					eye_color
					homeworld {
						name
						population
					}
					films {
						title
					}
				}
			}
		}
	`, {
		film: film
	}). then(function (result) {
		res.send(result)
	})
})

app.listen(5000, function() {
	console.log('listening on port 5000')
})
var Schema = require('graph.ql')

module.exports = function (loader) {
	return Schema(`
		scalar Date

		type Character {
			name: String!
			eye_color: String
			gender: String
			homeworld(): Planet
			films(): [Film]
		}

		type Film {
			title: String!
			producers(): [String]
			characters(limit: Int): [Character]
			release_date: Date
		}

		type Planet {
			name: String!
			population: Int
		}

		# These are the queries available on this server
		type Query {
			# find a film by id
			find_film (id: Int): Film
			# find a character by id
			find_character (id: Int): Character
		}
	`, {
		Date: {
		    serialize (date) {
		      return new Date(date)
		    }
		},
		Character: {
			homeworld (character, args) {
				return loader.planet.load(character.homeworld) 
			},
			films (character, args) {
				return loader.film.loadMany(character.films)
			}
		},
		Film: {
			producers (film, args) {
				return film.producers.split(/\s*,\s*/)
			},
			characters (film, args) {
				var characters = args.limit
				? film.characters.slice(0, args.limit)
				: film.characters

				return loader.character.loadMany(characters)
			}
		},
		Query: {
			find_film (query, args) {
				console.log('finding')
				return loader.film.load(args.id)
			},
			find_character (query, args) {
				return loader.character.load(args.id)
			}
		}
	})
}
var Schema = require('graph.ql')
/**
	remarkable - biblioteca para fazer o parse de textos estilo mardown para html
*/
var Remarkable = require('remarkable')
var remarkable = new Remarkable()
/**
	to_slug - biblioteca para gerar slugs
*/
var to_slug = require('to-slug-case')
/**
	object-assign - biblioteca para adicionar um atributo ao objeto
*/
var assign = require('object-assign')

var posts = {}

module.exports = Schema(`
	scalar Date
	scalar Markdown

	type Post {
		title: String!
		date: Date!
		body: Markdown!
		slug: String!
	}

	input PostInput {
		title: String!
		date: Date!
		body: Markdown!
	}

	type Mutation {
		create_post (post: PostInput): Post
	}

	type Query {
		all_posts(): [Post]
	}
`, {
	Date: {
		// método chamado para quando a data é chamada
		serialize(v) {
			return new Date(v)
		},
		// método chamado para quando a data é armazenada
		parse(v) {
			var date = new Date(v)
			return date.toISOString()
		}
	},
	Markdown: {
		serialize(v) {
			return v
		},
		parse(v) {
			return remarkable.render(v)
		}	
	},
	Mutation: {
		create_post (mutation, args) {
			var slug = to_slug(args.post.title)
			posts[slug] = assign(args.post, {
				slug: slug
			})

			return posts[slug]
		}
	},
	Query: {
		all_posts (query, args) {
			return Object.keys(posts).map(function(slug) {
				return posts[slug]
			})
		}
	}
})
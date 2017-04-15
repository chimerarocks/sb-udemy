var graphql = require('express-graph.ql')
var express = require('express')
var Schema = require('./schema.js')
var app = express()

app.post('/query', graphql(Schema))

app.listen(5000, function () {
	console.log('listening on port 5000')
})

/**
mutation create_post($post: PostInput) {
  post_created: create_post(post: $post) {
    title
    date
    body
    slug
  }
}
*/

/**
query get_posts {
  posts: all_posts {
    title
    date
  }
}
*/
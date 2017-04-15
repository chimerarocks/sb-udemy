var DataLoader = require('dataloader')
var axios = require('axios')

module.exports = function() {
	return {
		film: Film(),
		character: Character(),
		planet: Planet()
	}
}

function Film() {
	return new DataLoader(function(ids) {
		return axios.all(ids.map(id => {
			var url = Number.isInteger(id) ? `http://swapi.co/api/films/${id}/` : id
			return axios.get(url).then(res => res.data)
		}))
	})
} 

function Character() {
	return new DataLoader(function(ids) {
		return axios.all(ids.map(id => {
			var url = Number.isInteger(id) ? `http://swapi.co/api/people/${id}/` : id
			return axios.get(url).then(res => res.data)
		}))
	})
} 

function Planet() {
	return new DataLoader(function(ids) {
		return axios.all(ids.map(id => {
			var url = Number.isInteger(id) ? `http://swapi.co/api/planets/${id}/` : id
			return axios.get(url).then(res => res.data)
		}))
	})
} 
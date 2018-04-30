const fetch = require('promise-path').fetch
const expect = require('chai').expect
var assert = require('assert')

describe('Calisaurus boardgames website', function() {
  describe('Index Page', function() {
    let actual
    beforeEach(function() {
      return fetch('http://boardgames.calisaurus.net').then(function(body) {
        actual = body
      })
    })
    it('should contain links to other pages', function() {
      expect(actual).to.have.string('<a href="./about.html">About A Board Game A Day</a>')
    })

    it('should contain an image with an alt tag', function() {
      expect(actual).to.match(/<img src="\.\/calisaurus\.png" alt=".*" .* \/>/)
    })
  })

  describe('About page', function() {
    let actual
    beforeEach(function() {
      return fetch('http://boardgames.calisaurus.net/about').then(function(body) {
        actual = body
      })
    })
    it('should contain a heading', function() {
      expect(actual).to.have.string('<h1>About</h1>')
    })
    it('should contain an image', function() {
      expect(actual).to.have.string('about.jpg')
    })
  })
})

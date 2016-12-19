noflo = require 'noflo'
chai = require 'chai' unless chai
GetAvatar = require '../components/GetAvatar.coffee'

describe 'GetAvatar component', ->
  c = null
  email = null
  avatar = null
  beforeEach ->
    c = GetAvatar.getComponent()
    email = noflo.internalSocket.createSocket()
    avatar = noflo.internalSocket.createSocket()
    c.inPorts.email.attach email
    c.outPorts.avatar.attach avatar

  describe 'for matching email', ->
    address = 'henri.bergius@iki.fi'
    gravt = 'https://s.gravatar.com/avatar/995f27ce7205a79c55d4e44223cd6de0?s=200'
    it 'should produce a valid URL', (done) ->
      avatar.on 'data', (url) ->
        chai.expect(url).to.equal gravt
        done()
      email.send address

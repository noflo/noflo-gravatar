noflo = require 'noflo'
gravatar = require 'gravatar'

# @runtime noflo-nodejs

exports.getComponent = ->
  c = new noflo.Component
  c.description = 'Get avatar URL for a given email'
  c.inPorts.add 'email',
    datatype: 'string'
  c.inPorts.add 'size',
    datatype: 'int'
    control: true
    default: 200
  c.outPorts.add 'avatar',
    datatype: 'string'
  c.forwardBrackets =
    email: ['avatar']
  c.process (input, output) ->
    return unless input.hasData 'email'
    return if input.attached('size').length and not input.hasData 'size'
    size = 200
    if input.hasData 'size'
      size = input.getData 'size'
    email = input.getData 'email'
    avatar = gravatar.url email,
      s: size
    , true
    output.sendDone
      avatar: avatar

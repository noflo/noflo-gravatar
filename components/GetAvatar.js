const noflo = require('noflo');
const gravatar = require('gravatar');

// @runtime noflo-nodejs

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'Get avatar URL for a given email';
  c.inPorts.add('email', {
    datatype: 'string',
  });
  c.inPorts.add('size', {
    datatype: 'int',
    control: true,
    default: 200,
  });
  c.outPorts.add('avatar', {
    datatype: 'string',
  });
  c.forwardBrackets = {
    email: ['avatar'],
  };
  c.process((input, output) => {
    if (!input.hasData('email')) return;
    if (input.attached('size').length && !input.hasData('size')) {
      return;
    }
    let size = 200;
    if (input.hasData('size')) {
      size = input.getData('size');
    }
    const email = input.getData('email');
    const avatar = gravatar.url(email, {
      s: size,
    }, true);
    output.sendDone({
      avatar,
    });
  });
  return c;
};

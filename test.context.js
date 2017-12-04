var context = require.context('site', true, /-spec\.js$/);

context.keys().forEach(context);
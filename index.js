
var Hapi = require('hapi');
var server = new Hapi.Server('localhost', process.env.PORT, { cors: true });
var fraktur = require('fraktur');


server.views({
    engines: { html: require('handlebars') },
    path: __dirname + '/views',
});


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.route({
    method: 'GET',
    path: '/conv',
    handler: function (request, reply) {
        var q = request.query.q;
        var conv = '';

        if (q != null) {
            conv = fraktur(q);
        }

        reply(JSON.stringify({q: q, result: conv}));
    }
});

server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
        directory: {
            path: 'static'
        }
    }
});

server.start(function () {
    console.log('server running at ' + server.info.uri);
});

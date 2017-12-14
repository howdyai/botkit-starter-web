module.exports = function(webserver, controller) {


// This creates the /embed route, where an easy-to-copy embed code is available
webserver.get('/embed', function(req,res) {

    res.render('embed', {
      layout: 'layouts/default',
      base_url: req.hostname
    });

});

// This creates the /embed route, where an easy-to-copy embed code is available
webserver.get('/', function(req,res) {

    res.render('index', {
      layout: 'layouts/default',
      base_url: req.hostname
    });

});


}

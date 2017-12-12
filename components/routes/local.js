module.exports = function(webserver, controller) {

// add custom routes for your web server here.

webserver.get('/embed', function(req,res) {

    res.render('embed', {
      layout: 'layouts/default',
      base_url: req.hostname
    });

});


}

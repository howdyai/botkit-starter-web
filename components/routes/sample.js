module.exports = function(webserver, controller) {

// add custom routes for your web server here.

webserver.get('/sample', function(req,res) {
  
    res.send('Sample route');
  
});


}

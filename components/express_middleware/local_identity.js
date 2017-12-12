var request = require('request');


module.exports = function(webserver, controller){
  // check static.local for identity
  // console.log('webserver.locals: ', webserver.locals);
  if(!webserver.static){
    // if not call whoami and set it
    request({
        method: 'get',
        uri: (controller.config.studio_command_uri || 'https://studio.botkit.ai') + '/api/v2/users/whoami/' + controller.config.studio_token
    },function(err, res, body) {
        if (err) {
            console.log('Error registering instance with Botkit Studio', err);
        } else {
            var json =null;
            try {
                json = JSON.parse(body);
            } catch(err) {
                console.log('Error registering instance with Botkit Studio', err);
            }

            if (json) {
                if (json.error) {
                    console.log('Error registering instance with Botkit Studio', json.error);
                }
                // console.log('whoami: ', json.data);
                webserver.locals.local_identity = json.data;
                console.log('local_identity set from whoami...');
                // console.log('webserver.locals.local_identity: ', webserver.locals.local_identity);
            }
        }

    });
  }



}

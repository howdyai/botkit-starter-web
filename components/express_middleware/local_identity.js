var request = require('request');

module.exports = function(webserver, controller){
  // check static.local for identity
  if(!webserver.local || !webserver.local.local_identity){
    // if not call whoami and set it
    request({
        method: 'get',
        uri: (controller.config.studio_command_uri || 'https://studio.botkit.ai') + '/api/v2/users/whoami/' + controller.config.studio_token
    },function(err, res, body) {
        if (err) {
            console.log('Error confirming instance with Botkit Studio', err);
        } else {
            var json =null;
            try {
                json = JSON.parse(body);
            } catch(err) {
                console.log('Error confirming instance with Botkit Studio', err);
            }

            if (json) {
                if (json.error) {
                    console.log('Error confirming instance with Botkit Studio', json.error);
                }
                webserver.locals.bot_id = json.data.id;
                controller.config.botkit_studio_id = json.data.id;
                console.log('local_identity set from whoami... id:', webserver.locals.bot_id);

            }
        }

    });
  }
}

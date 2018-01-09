module.exports = function(controller) {

    controller.on('execute', function(bot, trigger) {
        console.log('TRIGGER A SCRIPT', trigger);
    });
}

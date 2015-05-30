'use strict';
var AppDispatcher = require('../Dispatcher/AppDispatcher'),
    Constants = require('../Constants');

var Actions = {

    GetPosts : function(){

        AppDispatcher.handleServerAction({
            actionType : Constants.GETPOSTS,
        });

    }
}

module.exports = Actions;

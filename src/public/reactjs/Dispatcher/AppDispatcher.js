'use strict';
var Constants = require('../Constants');

var Dispatcher = require('flux').Dispatcher;


var AppDispatcher = new Dispatcher();

$.extend( AppDispatcher, {

    handleServerAction: function(action) {
        var payload = {
            source: Constants.SOURCE_SERVER_ACTION,
            action: action
        };

        this.dispatch(payload);
    },

    handleViewsAction: function(action) {
        var payload = {
            source: Constants.SOURCE_VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    },

    handleRouterAction: function(path) {
        this.dispatch({
            source: Constants.SOURCE_ROUTER_ACTION,
            action: path
        });
    }

});

module.exports = AppDispatcher;


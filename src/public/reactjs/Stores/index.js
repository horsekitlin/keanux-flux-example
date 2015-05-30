'use strict';
var EventEmitter = require('events').EventEmitter,//取得廣播功能
    AppDispatcher = require('../Dispatcher/AppDispatcher'),
    Constants = require('../Constants'),
    Store = new EventEmitter();

var LocalDB = require("./LocalDB.js");


$.extend(Store, {

    getAll: function(){
        return LocalDB.getAllData();
    },

    reloadpage : function(){
        LocalDB.commit();
        this.emit(Constants.CHANGE_EVENT);
    },

    noop: function(){}
});

module.exports = Store

var ViewsAction = require('./ViewsAction.js'),
    ServerAction = require('./ServerAction.js'),
    RouteAction = require('./RouteAction.js');

//event handler
Store.dispatchToken = AppDispatcher.register(function(evt){
    switch(evt.source){
        case Constants.SOURCE_SERVER_ACTION:

            var key = evt.action.actionType,
                data = evt.action.data;

            ServerAction[key](data);

            break;
        case Constants.SOURCE_VIEW_ACTION:

            var key = evt.action.actionType,
                data = evt.action.data;

                ViewsAction[key](data);

            break;
        case Constants.SOURCE_ROUTER_ACTION:

            var key = evt.action.actionType,
                data = evt.action.data;

                RouteAction[key](data);

            break;
        default:
            console.log('Error');
    }

    Store.reloadpage();

});


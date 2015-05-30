'use strict';

function DBFactory(){

    this.data = this.initData();

    this._cache = window.localStorage;

    this._DBname = 'keanux';

}

DBFactory.prototype.initData = function(){
    return {
        posts : []
    }
}

DBFactory.prototype.commit = function(){

    this._cache.setItem(this._DBname, JSON.stringify(this.data));

}

DBFactory.prototype.getAllData = function(){

    return this.data;

}

DBFactory.prototype.update = function(key, value){

    this.data[key] = value;

};

var DB = new DBFactory();

module.exports = DB;

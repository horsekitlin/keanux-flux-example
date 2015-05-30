'use strict';
var LocalDB = require("./LocalDB.js"),
    Stores = require("./index.js");
//與Server 溝通

module.exports = {
    //key 跟 Constants 的key mapping
    GETPOSTS : function(){

        $.ajax({
        url: "/keanux/api/posts/",
        dataType: 'json',
        success: function(res) {
            LocalDB.update("posts", res.data);
            Stores.reloadpage();
        }.bind(this),
        error: function(xhr, status, err) {
        }.bind(this)
        });
    }

};

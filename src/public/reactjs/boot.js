'use strict';
var Blog = React.createFactory(require('./Components/index.jsx'));

$(function(){

    React.render(
        Blog(),
        document.getElementById('content')
    );

});

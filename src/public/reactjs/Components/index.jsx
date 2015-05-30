'use strict';
var NavBar = require("./units/navbar.jsx"),
    PostBox = require("./units/postbox.jsx");

var Actions = require('../Actions'),
    Constants = require('../Constants'),
    Stores = require('../Stores');

var HomePage = React.createClass({

    getInitialState: function(){
        var o = this.getTruth();
        return o;
    },

    componentWillMount: function(){
        Stores.addListener(Constants.CHANGE_EVENT, this._onChange);
    },

    componentWillUnmount: function(){
        Stores.removeChangeListener(this._onChange());
    },

    _onChange: function(){
        this.setState(this.getTruth());
    },

    getTruth: function(){

        return Stores.getAll();

    },

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <header>
                            <NavBar />
                        </header>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <article>
                            <PostBox
                                posts = {this.state.posts}/>
                        </article>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = HomePage;

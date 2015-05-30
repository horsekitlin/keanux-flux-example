'use strict';
var Actions = require("../../Actions");

var NavBar = React.createClass({

    _getposts : function(){

        Actions.GetPosts();

    },

    render : function(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">

                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Keanux Blog</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li>
                                <a
                                    href="#"
                                    onClick={this._getposts}>

                                    文章列表 <span className="sr-only">(current)</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = NavBar;

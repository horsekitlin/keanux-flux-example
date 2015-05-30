'use strict';
var converter = new Showdown.converter();
var Ago = require('react-ago-component');

var Post = React.createClass({
    propTypes : {

        unique_id : React.PropTypes.string,

        nickname : React.PropTypes.string,

        title : React.PropTypes.string,

        subtitle : React.PropTypes.string,

        username : React.PropTypes.string,

        create_time : React.PropTypes.number,

        key : React.PropTypes.string
    },

    _strip : function(html){

        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";

    },
    render: function() {
        var rawMarkup =
            converter.makeHtml(
                this.props.children.toString());

        var icon = "https://graph.facebook.com/" + this.props.username + "/picture?width=120&height=120";
        return (
        <div className="post">
            <PostMeta
                username={this.props.username}
                nickname={this.props.nickname}
                create_time={this.props.create_time} />

            <h2 className="postTitle">

                <a
                    href={"http://keanux.com/p/"
                        + this.props.unique_id}>

                    {this.props.title}
                </a>

            </h2>

            <h3 className="postSubTitle">
                {this.props.subtitle}
            </h3>

            <div className="postContent">
                {this._strip(rawMarkup)}
            </div>
        </div>
    );
    // <div className="postContent" dangerouslySetInnerHTML={{__html: rawMarkup}} />
  }
});

var PostMeta = React.createClass({
  render: function() {
    var then = new Date(this.props.create_time * 1000);
    return (
      <div className="block-postMeta postMeta-previewHeader">
        <div className="u-floatLeft">
          <div className="postMetaInline-avatar">
            <a href={"http://keanux.com/@" + this.props.username}>
              <img src={'https://graph.facebook.com/' + this.props.username + '/picture?width=120&height=120'} className="avatar-image avatar-image--smaller" />
            </a>
          </div>
          <div className="postMetaInline-feedSummary">
            <a href={"http://keanux.com/@" + this.props.username}>{this.props.nickname}</a>
            <span className="postMetaInline postMetaInline--supplemental">
              <Ago date={then} autoUpdate={true} tooltipFormat="long" />
            </span>
          </div>
        </div>
       </div>
    );
  }
});

var PostBox = React.createClass({
  componentDidMount: function() {
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="postBox">
        <PostList posts={this.props.posts} />
      </div>
    );
  }
});

var PostList = React.createClass({

    propTypes : {

        posts : React.PropTypes.array,

    },

    render: function() {
        var posts = this.props.posts;

        return (
        <div className="postList">
            {posts.map(function(post, index){
                return (
                    <Post
                        unique_id={post.unique_id}
                        nickname={post.nickname}
                        title={post.title}
                        subtitle={post.subtitle}
                        username={post.username}
                        create_time={post.create_time}
                        children={post.content}
                        key={index} />

                );
            })}
        </div>
        );
    }
});

module.exports = PostBox;
/*
 * */

'use strict';
var _ = require('lodash'),
    should = require("should"),
    testclient = require('supertest')("http://localhost/keanux");

var User = require('../src/models/user');
var Post = require('../src/models/post');

describe(' Control Center', function(){

    it('should search for posts data', function(done){

        Post.get(function(err, posts){
            if (err) {

                done(err);

            }else{
                testclient.get('/api/posts')
                .set('Content-Type', 'application/json')
                .send({})
                .end(function(err, res){

                    if(err){

                        done(err);

                    }else{

                        _.map(res.body.data, function(post, index){
                            var p  = _.find(posts, function(d){
                                return d.id === post.id;
                            });
                            if(_.isUndefined(p)){

                                done(new Error("post Not Found Error"));

                            }else{
                                post.should.have.property(
                                    "id"
                                    , p.id);
                                post.should.have.property(
                                    "image"
                                    , p.image);
                                post.should.have.property(
                                    "image_expand"
                                    , p.image_expand);
                                post.should.have.property(
                                    "nickname"
                                    , p.nickname);
                                post.should.have.property(
                                    "title"
                                    , p.title);
                                post.should.have.property(
                                    "user_id"
                                    , p.user_id);
                                post.should.have.property(
                                    "unique_id"
                                    , p.unique_id);
                                post.should.have.property(
                                    "update_time"
                                    , p.update_time);
                                post.should.have.property(
                                    "username"
                                    , p.username);
                                post.should.have.property(
                                    "content"
                                    , p.content);
                            }

                        });

                        done();
                    }
                });

            }

        });
    });

    it('should search for users data', function(done){

        User.get(function(err, users){
            if (err) {

                done(err);

            }else{

                testclient.get('/api/users')
                .set('Content-Type', 'application/json')
                .send({})
                .end(function(err, res){

                    if(err){

                        done(err);

                    }else{

                        _.map(res.body, function(user, index){
                            var u  = users[index];
                            user.should.have.property(
                                "id"
                                , u.id);

                            user.should.have.property(
                                "password"
                                , u.password);
                            user.should.have.property(
                                "create_time"
                                , u.create_time);
                            user.should.have.property(
                                "username"
                                , u.username);
                            user.should.have.property(
                                "facebook_account"
                                , u.facebook_account);
                            user.should.have.property(
                                "active"
                                , u.active);
                            user.should.have.property(
                                "read_only"
                                , u.read_only);
                            user.should.have.property(
                                "signin_time"
                                , u.signin_time);
                        });

                        done();
                    }
                });
            }

        });
    });
});

